import { React, useState, useEffect } from "react";
import {
  Link
} from "react-router-dom";
import axios from 'axios'
import login from './login.module.css';
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
      <div className={login.left}>
          <h2> Login to access your </h2>
          <h1> Account </h1>
            <table>
              <tr>
                <td className={login.label} id="email">
                  Email
                </td>
              </tr>
              <tr>
                <td>
                  <FontAwesomeIcon id="email_icon" className={ login.icon } icon={ faAt } />
                </td>
                <td>
                  <input onChange={handleField} value={user.email} onFocus={highLight} onBlur={dehighLight} type="text" name="email" placeholder="email address" /> 
                </td>
              </tr> 
              <tr>
                <td className={login.label} id="password">
                  Password
                </td>
              </tr>
              <tr>
                <td>
                  <FontAwesomeIcon id="password_icon" className={ login.icon } icon={ faLock } />
                </td>
                <td>
                  <input onChange={handleField} value={user.password} onFocus={highLight} onBlur={dehighLight} type="password" name="password" placeholder="password" /> <br />
                </td>
              </tr>
            </table>
            <button onClick={HandleSubmit}> Continue </button> 
            <h3> Not yet registered? <Link to ="/signup" > Sign up </Link> </h3>
      </div>
      <div className={login.right}>
        <h1> Create. Build. Edit. </h1>
        <img src='./computer.png' />'
        <h2> ALL-IN-ONE </h2>
        <h3> Composable Cloud Portfolio </h3>
        <h4> An online portfolio manager with a drag and drop page builder that gives you the freedom to easily manage your online portfolio to grow your as your experience does. </h4>
      </div>
    </div>
  );
}

export default Login;