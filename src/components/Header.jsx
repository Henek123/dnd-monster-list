import React from 'react'
import './styles/Header.css'
import Logo from "../img/logo.svg"
import LogInModal from './LogInModal'
import { signOut } from "firebase/auth";

export default function Header(props) {
  const [showLogInModal, setShowLogInModal] = React.useState(false);
  //handling logout
  function handleLogOut(){
    signOut(props.auth).then(() => {
        props.setUserUID('');
        // props.setSavedSpells([])
    }).catch((error) => {
        console.log(error)
    });
  }
  return (
    <section className='header'>
      <img src={Logo}  alt='D&D logo' className='logo'/>
      <h1>Monster List</h1>
      <div>
        {props.userUID ? 
          <button onClick={handleLogOut}>Log Out</button> :
          <button onClick={() => (setShowLogInModal(prevState => !prevState))}>Log In</button>
        }
        <button>Show Saved Monsters</button>
        <button>Return To Top</button>
      </div>
      {showLogInModal && 
            <LogInModal 
                setShowLogInModal={setShowLogInModal} 
                auth={props.auth} setUserUID={props.setUserUID} 
                userUID={props.userUID}
            />}
    </section>
  )
}
