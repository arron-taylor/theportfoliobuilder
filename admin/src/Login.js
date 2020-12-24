import { React, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect, Link
} from "react-router-dom";
import { Dashboard, Analytics, Pages, Inquiries, Settings } from './pages'
import axios from 'axios'
import signup from './signup.module.css';
import style from './styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt, faLock } from '@fortawesome/free-solid-svg-icons'

function Login() { 

  const [user, setUser] = useState({name: '', email: '', isLoggedIn: false});
  const [focused, setFocus] = useState({email:false, password:false});

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
  useEffect( () => {
    Object.keys(focused).map(
      (i, key) => {
        if(focused[i] === true) {
          let element = document.getElementById(i);
          let element_icon = document.getElementById(i + '_icon');
          element.style.color = "#7165E3";
          element.style.fontWeight = 'bold';
          element_icon.style.color = "#7165E3";
        }
        else {
          let element_icon = document.getElementById(i + '_icon');
          let element = document.getElementById(i);
          element.style.color = "#989898";
          element.style.fontWeight = 'normal';
          element_icon.style.color = "#DBDBDB";
        }
      }
    )
  });

  const HandleSubmit = (e) => {
    e.preventDefault();
    // fetch('http://localhost:3001/users').then(response => response.json()).then(data => console.log(data));
    let data = user;
    axios.post('http://localhost:3001/login', data).then( (response) => { 
      localStorage.setItem("token", response.data.jwt);console.log(response.data.jwt); if(response.status == 200) { window.location = 'http://localhost:3000/dashboard' } }).catch((error) => { 
        console.log(error.response) 
      });
  }

  return (
    <div className={style.wrapper}>
      <div className={signup.left}>
          <h2> Login to access your </h2>
          <h1> Account </h1>
          <form >
            <table>
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
                  <input onChange={handleField} value={user.email} onFocus={highLight} onBlur={dehighLight} type="text" name="email" placeholder="email address" /> 
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
            <button onClick={HandleSubmit}> Login </button> 
          </form>
      </div>
      <div className={signup.right}>
        right
      </div>
    </div>
  );
}

export default Login;