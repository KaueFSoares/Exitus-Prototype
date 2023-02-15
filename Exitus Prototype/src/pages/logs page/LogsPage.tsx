import React from 'react'
import {useContext} from "react"
import MyContext from '../../context/global info/MyContext'
import "./logspage.sass"
import CodeFinderForLogs from '../../components/other/CodeFinderForLogs/CodeFinderForLogs'


function LogsPage() {

  const { code }: any = useContext(MyContext)

  return (
    <div id='logspage-container'>
      <CodeFinderForLogs />

      { code !== "" && 
      <p>{code}</p>
      }
    </div>
  )
}

export default LogsPage