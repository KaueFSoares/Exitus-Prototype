import React from 'react'
import { Link } from 'react-router-dom'

import "./navbar.sass"

function Navbar() {
  return (
    <nav id='navbar-container'>
      <a id="img-link" href="http://www.sapiranga.ifsul.edu.br/">
        <img src='images/logo.png' alt="Logo do IFsul" id='logo' />
      </a>

      <ul id='link-list'>
        <li className='link-buttons'>
          <Link to="/">
            <p>Home</p>
          </Link>
        </li>
        <li className='link-buttons'>
          <Link to="/registerpage">
            <p>Register</p>
          </Link>
        </li>
        <li className='link-buttons'>
          <Link to="/logspage">
            <p>Logs</p>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar