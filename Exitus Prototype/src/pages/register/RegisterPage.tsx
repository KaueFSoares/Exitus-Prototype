import React, { useState } from 'react'

import "./registerpage.sass"
import CodeRegister from '../../components/other/CodeRegister/CodeRegister'
import CpfRegister from '../../components/other/CpfRegister/CpfRegister'

function RegisterPage() {

  const [registerType, setRegisterType] = useState<"code" | "cpf">("cpf")

  function changeRegisterType(type: "code" | "cpf") {
    setRegisterType(type)
  }

  return (
    <div id='registerpage-container'>

      <div id="register-box">

        <div id='input-box'>
          {registerType === "code" ? (
            <CodeRegister />
          ) : (
            <CpfRegister />
          )}
        </div>

        <div id='change-register-mode-box'>
          <button onClick={() => changeRegisterType("code")}>
            <p className={registerType === "code" ? "underline" : ""}>Code</p>
          </button>
          <button onClick={() => changeRegisterType("cpf")}>
            <p className={registerType === "cpf" ? "underline" : ""}>CPF</p>
          </button>
        </div>

      </div>

    </div>
  )
}

export default RegisterPage