import { useState } from 'react'
import styles from './Navbar.module.css';
function Navbar() {

  return (
    <div>
        Navebar
        <div>
            <a href="/">home</a>
            <a href="/game/">game</a>
            <a href="/pinball/">pinball</a>
            <a href="/card/">card</a>
        </div>

    </div>
  )
}

export default Navbar
