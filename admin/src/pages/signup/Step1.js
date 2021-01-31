import { React, useState, useEffect } from "react";
import {
 Link
} from "react-router-dom";
import signup from '../../signup.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import FocusHandler from '../../modules/FocusHandler'
import FormValidate from '../../modules/FormValidate'


export default function Step1(props) {

  const [user, setUser] = useState(props.user);
  const [focused, setFocus] = useState({email:false, password:false});
  
  useEffect( () => {
    FocusHandler(focused)
  });

  const handleField = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({ ...prevState,[name]: value}));
  }
  const highLight = (e) => {
    const { name, value } = e.target;
    setFocus(prevState => ({ ...prevState, [name]:true }));
  }
  const dehighLight = (e) => {
    const { name, value } = e.target;
    setFocus(prevState => ({ ...prevState, [name]:false }));
  }
   const nextStep = () => {
    if( user.name && user.email && user.password) {
      props.next(user)
    }
    else {
      FormValidate(user, 'step1')
    }
  }
  return(
    <>
    <h2> Create an account to continue </h2>
          <h1> Getting Started </h1>
          <table>
            <tr>
                <td className={signup.label} id="name">
                  Full Name
                </td>
              </tr>
              <tr>
                <td>
                  <FontAwesomeIcon id="name_icon" className={ signup.icon } icon={ faUser } />
                </td>
                <td>
                  <input id="name_input" onChange={handleField} value={user.name} onFocus={highLight} onBlur={dehighLight} type="text" name="name" placeholder="your full name" /> 
                </td>
              </tr> 
              <tr>
                <td className={signup.label} id="email">
                  Email
                </td>
              </tr>
              <tr>
                <td>
                  <FontAwesomeIcon id="email_icon" className={ signup.icon } icon={ faAt } />
                </td>
                <td>
                  <input onChange={handleField} value={user.email} onFocus={highLight} onBlur={dehighLight} type="text" name="email" placeholder="your email address" /> 
                </td>
              </tr> 
              <tr>
                <td className={signup.label} id="password">
                  Password
                </td>
              </tr>
              <tr>
                <td>
                  <FontAwesomeIcon id="password_icon" className={ signup.icon } icon={ faLock } />
                </td>
                <td>
                  <input onChange={handleField} value={user.password} onFocus={highLight} onBlur={dehighLight} type="password" name="password" placeholder="password" /> <br />
                </td>
              </tr>
            </table>
            <button className={signup.button} onClick={nextStep}> Register </button> 
          <h3> Already registered? <Link to ="/login" > Login </Link> </h3>
      </>

  )
}