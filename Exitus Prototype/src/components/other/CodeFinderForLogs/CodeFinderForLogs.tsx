import React, { useContext, useState } from 'react'
import "./codefinderforlogs.sass"
import MyContext from '../../../context/global info/MyContext'

function CodeFinderForLogs() {

    const { setCode }: any = useContext(MyContext)

    function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        testCpfFormat(cpf)
        testDateFormat(date)

        setMessageType("success")
        reloadPage()
    }

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
    }
    //-----------------------------------------------------------------------------------//



    //Formating the date
    const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const formattedDate = formatDate(value)
        setDate(formattedDate)
    }

    const formatDate = (value: string) => {
        value = value.slice(0, 10)
        if (value.length === 2 || value.length === 5) {
            value = `${value}/`
        }
        return value
    }
    //-----------------------------------------------------------------------------------//



    //Getting the value from the input whenever it changes using the on change on the input element
    const [cpf, setCpf] = useState<string>("")
    const [date, setDate] = useState<string>("")
    //-----------------------------------------------------------------------------------//



    //Testing the CPF
    function testCpfFormat(cpfValue: string) {
        cpfValue = cpfValue.replace(/\D/g, '')
        if (cpfValue.length === 11) {
            setMessage("cpf deu certo")
        }
    }
    //-----------------------------------------------------------------------------------//



    //Testing the date
    function testDateFormat(dateValue: string) {
        dateValue = dateValue.replace(/\D/g, '')
        if(dateValue.length === 8){
            setMessage(message + "\n data deu certo")
        }
    }
    //-----------------------------------------------------------------------------------//



    //Global variabel to storage the message and message type
    const [message, setMessage] = useState<string>("")
    const [messageType, setMessageType] = useState<"success" | "fail">("success")
    //-----------------------------------------------------------------------------------//



    //Function to reload the page and show a error message if the information is not valid
    const [showResultMessage, setShowResulteMessage] = useState<boolean>(false)
    function reloadPage() {

        setShowResulteMessage(true)

        setTimeout(() => {
            window.location.reload()
        }, 5000)

    }
    //-----------------------------------------------------------------------------------//


    return (
        <>
            {showResultMessage ? (
                <div className={`result-box-code-finder ${["type-" + messageType]}`}>
                    <p>{message}</p>
                </div>
            ) : (
                <form id='code-finder-container' onSubmit={handleOnSubmit}>
                    <div id="inputs-box">
                        <div className="code-finder-input-box">
                            <label htmlFor="" className="input-label">
                                CPF
                            </label>
                            <input
                                type="text"
                                name="cpf"
                                id="code-finder-cpf-input"
                                className='input'
                                placeholder='Digite seu cpf'
                                maxLength={14}
                                onChange={handleCpf}
                                value={cpf}
                            />
                        </div>

                        <div className="code-finder-input-box">
                            <label htmlFor="" className="input-label">
                                Data de nascimento
                            </label>
                            <input
                                type="text"
                                name="nasc"
                                id="code-finder-nasc-input"
                                className='input'
                                placeholder='Digite sua data de nascimento'
                                maxLength={10}
                                onChange={handleDate}
                                value={date}
                            />
                        </div>
                    </div>

                    <div id='button-box'>
                        <button type="submit">Procurar <br /> logs</button>
                    </div>
                </form>
            )}
        </>
    )
}

export default CodeFinderForLogs