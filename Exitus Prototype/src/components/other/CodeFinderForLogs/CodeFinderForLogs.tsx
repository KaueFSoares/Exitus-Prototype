import React, { useContext, useState } from 'react'
import "./codefinderforlogs.sass"
import MyContext from '../../../context/global info/MyContext'

//FUNCTIONS

import testCpfFormat from './functions/testCpfFormat'

function CodeFinderForLogs() {

    const { setCode }: any = useContext(MyContext)

    //Submit function
    function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if(testCpfFormat(cpf) === true){
            setMessage("Cpf válido")
        } else {
            setMessage("Cpf inválido")
        }
        setMessageType("success")
        reloadPage()
    }
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
    }
    //-----------------------------------------------------------------------------------//



    //Getting the value from the input whenever it changes using the on change on the input element
    const [cpf, setCpf] = useState<string>("")
    const [register, setRegister] = useState<string>("")
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
                                Matrícula
                            </label>
                            <input
                                type="text"
                                name="registration"
                                id="code-finder-nasc-input"
                                className='input'
                                placeholder='Digite sua matrícula'
                                maxLength={20}
                                onChange={(e) => setRegister(e.target.value)}
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