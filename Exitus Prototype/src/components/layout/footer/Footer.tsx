import React from 'react'

import {AiOutlineGithub} from "react-icons/ai"

import "./footer.sass"

function Footer() {
  return (
    <footer id='footer-container'>
        <p>&copy;Exitus</p>
        <a href="https://github.com/KaueFSoares/ProjetoExitus" id='github-icon-link'>
            <AiOutlineGithub id='github-icon'/>
        </a>
    </footer>
  )
}

export default Footer