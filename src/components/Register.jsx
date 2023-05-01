import React from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Register(props) {

  const [user, setUser] = React.useState(
    {
      email: "",
      password: "",
      confirmPassword: "",
    }
  )

  function handleChange(event){
    setUser(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }
  const [passwordConfirmation, setPasswordConfirmation] = React.useState(null)
  const [emailInUse, setEmailInUse] = React.useState(false)
   //handle register

   function handleRegister(event){
    event.preventDefault();
    setPasswordConfirmation(null)
    if(user.password !== user.confirmPassword){
      setPasswordConfirmation("Passwords are diffrent")
      return;
    }
    createUserWithEmailAndPassword(props.auth, user.email, user.password)
    .then((userCredential) => {
    const firebaseUser = userCredential.user;
    props.setUserUID(firebaseUser.uid)
    })
    .catch((error) => {
      setEmailInUse(true);
      // const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
  });
  }

  return (
    <>
      <button className="close-btn"  onClick={() => props.setShowLogInModal(false)}>X</button>
      <form onSubmit={(event) => handleRegister(event)}>
        <label htmlFor="e-mail">Your e-mail</label>
        <input 
          type="email"
          name="email"
          placeholder="e-mail"
          onChange={handleChange}
          value={user.email}
        />
        <label htmlFor="password">Password</label>
        <input
          minLength="6"
          required 
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
          value={user.password}
        />
        <label htmlFor="confirm-password">Confirm password</label>
        <input
          id="confirm-password"
          required
          type="password"
          name="confirmPassword"
          placeholder="confirm password"
          onChange={handleChange}
          value={user.confirmPassword}
        />
        <button className='login-btn'>Sign Up</button>
        {passwordConfirmation && <p className="error">{passwordConfirmation}</p>}
        {emailInUse && <p className="error">E-mail already in use</p>}
      </form>
    </>
  )
}
