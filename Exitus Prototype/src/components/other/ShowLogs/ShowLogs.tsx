import React, { useState, useContext, useEffect } from 'react'
import MyContext from '../../../context/global info/MyContext'
import "./showlogs.sass"
import { ILog } from '../../../types/types'
import loadLogs from './functions/loadLogs'

function ShowLogs() {

    //getting the global code variable
    const { code }: any = useContext(MyContext)
    //-----------------------------------------------------------------------------------//



    //varible to storage the logs
    const [logs, setLogs] = useState<ILog[]>()
    const [name, setName] = useState<String>()
    //-----------------------------------------------------------------------------------//



    //varible to storage the logs
    const [showLogs, setShowLogs] = useState<boolean>(false)
    //-----------------------------------------------------------------------------------//



    //function to load the logs whenever the code changes
    useEffect(() => {
        if (code !== undefined && code !== "") {
            loadLogs(code)
                .then(res => {
                    setLogs(res.logs)
                    setName(res.name)
                    setShowLogs(true)
                })
        }
    }, [code])
    //-----------------------------------------------------------------------------------//

    return (
        <>
            {showLogs === true ? (
                <div className="show-logs-container-logged">
                    <header id="logs-header">
                        <span id="name">{name}</span>
                    </header>
                    <ul id="logs-body">
                        {
                            logs?.map((log, index) => (
                                <li key={log.id} className={`item item-${log.type}`}>
                                    <div className='log-type'>{log.type.toUpperCase()}</div>
                                    <div className='log-date-box'>
                                        <div className="logday">
                                            <p>Date: {log.createdAt.day}/{log.createdAt.month}/{log.createdAt.year}</p>
                                        </div>
                                        <div className="loghour">
                                            <p>Hour: {log.createdAt.hour}:{log.createdAt.min}</p>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            ) : (
                <div className="show-logs-container-not-logged">
                    <p id='notlogged'>Por favor digite o cpf<br /> e matrícula para <br />consultar os registros   </p>
                </div>
            )}
        </>
    )
}

export default ShowLogs