import React from 'react'
import './styles/Header.css'
import Logo from "../img/logo.svg"

export default function Header() {
  return (
    <section className='header'>
      <img src={Logo}  alt='D&D logo' className='logo'/>
      <h1>Monster List</h1>
      <div>
        <button>Log In</button>
        <button>Show Saved Monsters</button>
        <button>Return To Top</button>
      </div>
    </section>
  )
}
