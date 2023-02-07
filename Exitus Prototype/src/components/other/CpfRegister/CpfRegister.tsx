import React, { useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from "uuid"

import { ILog, IPerson, TDateForLeave } from "../../../types/types"

import { checkAge } from "../../../context/functions/RegisterFunctions"

import "./cpfregister.sass"

function CpfRegister() {

    //Global variabel to storage the message and message type
    const [message, setMessage] = useState<string>("")
    const [messageType, setMessageType] = useState<"success" | "fail">("success")
    //-----------------------------------------------------------------------------------//



    //Setting the focus to always go on the input
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current!.focus()
    }, [])
    //-----------------------------------------------------------------------------------//



    //Getting the value from the input whenever it changes using the on change on the input element
    const [cpf, setCpf] = useState<string>("")
    var code: string = ""
    //-----------------------------------------------------------------------------------//



    //Formating the CPF
    const handleCpf = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const formattedCpf = formatCpf(value)
        setCpf(formattedCpf)
    }

    const formatCpf = (value: string) => {
        value = value.slice(0, 14)
        if (value.length === 3 || value.length === 7) {
            value = `${value}.`
        }
        if (value.length === 11) {
            value = `${value}-`
        }
        return value
    };
    //-----------------------------------------------------------------------------------//



    //Global date variable for the functions
    var firstDate: Date = new Date()
    const [systemDate, setSystemDate] = useState<Date>(firstDate)

    useEffect(() => {
        setTimeout(() => {

            let date: Date = new Date()

            setSystemDate(date)

        }, 60000)
    }, [systemDate])
    //-----------------------------------------------------------------------------------//



    //Function to show the result message and reload the page
    const [showResultMessage, setShowResulteMessage] = useState<boolean>(false)
    function reloadPage() {

        setShowResulteMessage(true)

        setTimeout(() => {
            window.location.reload()
        }, 5000)

    }
    //-----------------------------------------------------------------------------------//



    //Function to find the code from the cpf typed
    async function findCode(cpf: string) {
        const res = await fetch(`http://localhost:5001/person/`)
        const data: IPerson[] = await res.json()

        if (data) {
            let returnData = data.find(
                (person: IPerson) => person.cpf === cpf
            )

            if (returnData) {
                code = returnData.id
                return returnData.id
            } else {
                setMessage(`Invalid CPF!`)
                setMessageType("fail")
                reloadPage()
            }

        } else {
            setMessage(`Invalid CPF!`)
            setMessageType("fail")
            reloadPage()
        }
    }
    //-----------------------------------------------------------------------------------//



    //Function for loading person data from the database for cheking if it can go in or out of the school on the moment
    async function loadData() {

        const id = await findCode(cpf)

        const res = await fetch(`http://localhost:5001/person/${id}`)
        const data: IPerson = await res.json()

        if (data.id) {
            return data
        } else {
            setMessage(`Invalid CPF!`)
            setMessageType("fail")
            reloadPage()
        }
    }
    //-----------------------------------------------------------------------------------//



    //Run the register function when the input value length gets to 36 - the uuidv4 size
    useEffect(() => {
        if (cpf.length > 13) {

            register()

        }
    }, [cpf])
    //-----------------------------------------------------------------------------------//


    //Register function
    async function register() {
        var data: IPerson | undefined = await loadData()

        if (data) {

            if (data.onSchool === true) {

                //apply the rules for leaving

                if (canLeave(data) === true) {

                    data.onSchool = !data.onSchool

                    let localLog: ILog = {
                        id: uuidv4(), type: "leave", createdAt: {
                            day: systemDate.getDate(),
                            month: systemDate.getMonth() + 1,
                            year: systemDate.getFullYear(),
                            hour: systemDate.getHours(),
                            min: systemDate.getMinutes()
                        }
                    }

                    data.logs.push(localLog)

                    fetch(`http://localhost:5001/person/${code}`, {
                        method: "PATCH",
                        headers: {
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify(data)
                    })
                        .then((resp) => resp.json())
                        .then(() => {

                            reloadPage()

                        })
                        .catch(err => {
                            setMessage(`Exit denied due to: ${err}`)
                            setMessageType("fail")
                            reloadPage()
                        })

                }


            } else {

                //apply the rules for entering

                if (canEnter(data) === true) {

                    data.onSchool = !data.onSchool

                    let localLog: ILog = {
                        id: uuidv4(), type: "enter", createdAt: {
                            day: systemDate.getDate(),
                            month: systemDate.getMonth() + 1,
                            year: systemDate.getFullYear(),
                            hour: systemDate.getHours(),
                            min: systemDate.getMinutes()
                        }
                    }

                    data.logs.push(localLog)

                    fetch(`http://localhost:5001/person/${code}`, {
                        method: "PATCH",
                        headers: {
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify(data)
                    })
                        .then((resp) => resp.json())
                        .then(() => {

                            reloadPage()

                        })
                        .catch(err => {
                            setMessage(`Exit denied due to: ${err}`)
                            setMessageType("fail")
                            reloadPage()
                        })

                }

            }

        } else {
            setMessage(`Invalid CPF!`)
            setMessageType("fail")
            reloadPage()
        }
    }
    //-----------------------------------------------------------------------------------//



    //Function for cheking if the person can LEAVE the school
    function canLeave(data: IPerson) {

        let nowDate: TDateForLeave = {
            hour: systemDate.getHours(),
            min: systemDate.getMinutes()
        }

        if (data.shift === "morning") {

            if (nowDate.hour > 12) {
                setMessage("Exit approved!")
                setMessageType("success")
                return true
            } else if (nowDate.hour === 12 && nowDate.min >= 15) {
                setMessage("Exit approved!")
                setMessageType("success")
                return true
            } else {

                if (checkAge(data.dateOfBirth, systemDate) === true) {
                    setMessage("Exit approved!")
                    setMessageType("success")
                    return true
                } else if (data.permissionToLeaveEarly === true) {
                    setMessage("Exit approved!")
                    setMessageType("success")
                    return true
                } else {
                    setMessage("Exit denied due to it is not 12:15 and you have no permission to leave earlier!")
                    setMessageType("fail")
                    reloadPage()
                }
            }

        } else if (data.shift === "afternoon") {

            if (nowDate.hour > 18) {
                setMessage("Exit approved!")
                setMessageType("success")
                return true
            } else if (nowDate.hour === 18 && nowDate.min >= 15) {
                setMessage("Exit approved!")
                setMessageType("success")
                return true
            } else {

                if (checkAge(data.dateOfBirth, systemDate) === true) {
                    setMessage("Exit approved!")
                    setMessageType("success")
                    return true
                } else if (data.permissionToLeaveEarly === true) {
                    setMessage("Exit approved!")
                    setMessageType("success")
                    return true
                } else {
                    setMessage("Exit denied due to it is not 12:15 and you have no permission to leave earlier!")
                    setMessageType("fail")
                    reloadPage()
                }
            }

        } else {

            //--------------------------------------------------------------//

            //THE VALIDATION MOST BE CHANGED FOR THE NIGHT SHIFT LEAVING TIME

            //--------------------------------------------------------------//

            if (nowDate.hour > 18) {
                setMessage("Exit approved!")
                setMessageType("success")
                return true
            } else if (nowDate.hour === 18 && nowDate.min >= 15) {
                setMessage("Exit approved!")
                setMessageType("success")
                return true
            } else {

                if (checkAge(data.dateOfBirth, systemDate) === true) {
                    setMessage("Exit approved!")
                    setMessageType("success")
                    return true
                } else if (data.permissionToLeaveEarly === true) {
                    setMessage("Exit approved!")
                    setMessageType("success")
                    return true
                } else {
                    setMessage("Exit denied due to it is not 12:15 and you have no permission to leave earlier!")
                    setMessageType("fail")
                    reloadPage()
                }
            }

        }
    }
    //-----------------------------------------------------------------------------------//



    //Function for cheking if the person can ENTER the school
    function canEnter(data: IPerson) {

        let nowDate: TDateForLeave = {
            hour: systemDate.getHours(),
            min: systemDate.getMinutes()
        }

        if (data.shift === "morning") {

            if (nowDate.hour > 6) {
                setMessage("Acess approved!")
                setMessageType("success")
                return true
            } else if (nowDate.hour === 6 && nowDate.min >= 30) {
                setMessage("Acess approved!")
                setMessageType("success")
                return true
            } else {

                if (data.permissionToEnterOnOtherShift === true) {
                    setMessage("Acess approved!")
                    setMessageType("success")
                    return true
                } else {
                    setMessage("Acess denied due tue it is not your shift!")
                    setMessageType("fail")
                    reloadPage()
                }
            }

        } else if (data.shift === "afternoon") {

            if (nowDate.hour > 12) {
                setMessage("Acess approved!")
                setMessageType("success")
                return true
            } else if (nowDate.hour === 12 && nowDate.min >= 30) {
                setMessage("Acess approved!")
                setMessageType("success")
                return true
            } else {

                if (data.permissionToEnterOnOtherShift === true) {
                    setMessage("Acess approved!")
                    setMessageType("success")
                    return true
                } else {
                    setMessage("Acess denied due tue it is not your shift!")
                    setMessageType("fail")
                    reloadPage()
                }
            }

        } else {

            //--------------------------------------------------------------//

            //THE VALIDATION MOST BE CHANGED FOR THE NIGHT SHIFT ENTERING TIME

            //--------------------------------------------------------------//

            if (nowDate.hour > 18) {
                setMessage("Acess approved!")
                setMessageType("success")
                return true
            } else if (nowDate.hour === 18 && nowDate.min >= 30) {
                setMessage("Acess approved!")
                setMessageType("success")
                return true
            } else {

                if (data.permissionToEnterOnOtherShift === true) {
                    setMessage("Acess approved!")
                    setMessageType("success")
                    return true
                } else {
                    setMessage("Acess denied due tue it is not your shift!")
                    setMessageType("fail")
                    reloadPage()
                }
            }

        }

    }
    //-----------------------------------------------------------------------------------//



    return (
        <>
            {showResultMessage ? (
                <div className={`result-box ${["type-" + messageType]}`}>
                    <p>{message}</p>
                </div>
            ) : (
                <input
                    type='text'
                    id='cpf-input'
                    maxLength={14}
                    placeholder='Insert the CPF'
                    ref={inputRef}
                    onChange={handleCpf}
                    value={cpf}
                />
            )}
        </>

    )
}

export default CpfRegister