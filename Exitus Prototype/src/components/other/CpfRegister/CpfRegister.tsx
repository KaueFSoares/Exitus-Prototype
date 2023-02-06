import React, { useState, useRef, useEffect } from 'react'

import "./cpfregister.sass"

function CpfRegister() {

  //Setting the focus to always go on the input
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current!.focus()
  }, [])
  //-------------------------------------------//

  return (
    <input
      type='text'
      id='cpf-input'
      maxLength={36}
      placeholder='Insert the CPF'
      ref={inputRef}
    />
  )
}

export default CpfRegister