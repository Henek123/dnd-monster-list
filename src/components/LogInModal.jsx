import React from 'react'
import "./styles/LogInModal.css"
import Login from './Login'
import Register from './Register'


export default function LogInModal(props) {

  const [singUp, setSingUp] = React.useState(false);
  function decideWhatToDisplay(signUp, userUID){
    if(signUp && !userUID){
      return (
        <>
          <Register auth={props.auth} setUserUID={props.setUserUID} setShowLogInModal={props.setShowLogInModal}/>
          <p style={{userSelect: 'none'}} onClick={() => setSingUp(prevState => !prevState)}>Log In</p>
         </>
      )
    } else if(!userUID){
        return (
          <>
            <Login auth={props.auth} setUserUID={props.setUserUID} setShowLogInModal={props.setShowLogInModal}/>
            <p style={{userSelect: 'none'}} onClick={() => setSingUp(prevState => !prevState)}>Create Account</p>
          </>
        )
    } else{
      setTimeout(() => props.setShowLogInModal(false), 1000)
      return <h1>You are logged in</h1>
    }
  }

  function handleChildElementClick(e){
    e.stopPropagation()
  }

  return (
    <div className="login-container">
      <div className="dimmed" onClick={() => props.setShowLogInModal(false)}>
        <div className="modal" onClick={(e) => handleChildElementClick(e)}>
          {decideWhatToDisplay(singUp, props.userUID)}
        </div>
      </div>
    </div>
  )
}
