import React from 'react'
import "./loginform.sass"

function LoginForm() {

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()



    }

    return (
        <div id='login-form-container'>
            <form action="" onSubmit={handleSubmit} id="login-form">

                <div className="input-box">
                    <label htmlFor="" className="username">Usuário</label>
                    <input type="text" name="username" id="username-input" placeholder='Digite seu usuário'/>
                </div>

                <div className="input-box">
                    <label htmlFor="" className="password">Senha</label>
                    <input type="text" name="password" id="password-input" placeholder='Digite sua senha'/>
                </div>

                <div id="submit-box">
                    <input type="submit" value="Login" id="submit-button" />
                </div>


            </form>
        </div>
    )
}

export default LoginForm