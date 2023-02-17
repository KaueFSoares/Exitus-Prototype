import React from 'react'
import {useContext} from "react"
import MyContext from '../../context/global info/MyContext'
import "./logspage.sass"
import CodeFinderForLogs from '../../components/other/CodeFinderForLogs/CodeFinderForLogs'
import ShowLogs from '../../components/other/ShowLogs/ShowLogs'


function LogsPage() {

  const { code }: any = useContext(MyContext)

  return (
    <div id='logspage-container'>
      <CodeFinderForLogs />

      <ShowLogs />
    </div>
  )
}

export default LogsPage