import { React, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect, Link
} from "react-router-dom";
import axios from 'axios'
import signup from '../../signup.module.css';
import style from '../../styles.module.css';
import Sidebar from '../../components/Sidebar'
import Content from '../../components/Content'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAstronaut, faChevronDown, faUserSecret, faAt, faLock, faUser, faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import FocusHandler from '../../modules/FocusHandler'


export default function Step3(props) {

  const [user, setUser] = useState(props.user);
  const [focused, setFocus] = useState({password:false});
  useEffect( () => {
    FocusHandler(focused);
  });
  const handleField = (e) => {
      const name = e.target.getAttribute('name');
      let value = e.target.getAttribute('value');
   //   (user.avatar.substr(2)).substr(0,1).toUpperCase() + (user.avatar.substr(2)).substr(0, user.avatar.length-6).substr(1)
      setUser(prevState => ({ ...prevState,[name]: value}));
      toggledropdown();
  }
  const highLight = (e) => {
    if(e.target.getAttribute('name') === 'avatar') {
      document.getElementById('avatardropdownmenu').style.display = 'flex'
    }
    else {
      const { name, value } = e.target;
      setFocus(prevState => ({ ...prevState, [name]:true }));
    }
  }
  const dehighLight = (e) => {
    if(e.target.getAttribute('name') === 'avatar') {
      document.getElementById('avatardropdownmenu').style.display = 'none'
    }
     else {
      const { name, value } = e.target;
      setFocus(prevState => ({ ...prevState, [name]:false }));
    }
  }
  const toggledropdown = () => {
    if(document.getElementById('avatardropdownmenu').style.display == 'none') {
      document.getElementById('avatardropdownmenu').style.display = 'flex';
      document.getElementById('dropdownbutton').style.background = "#EFEFEF"
      document.getElementById('dropdownbutton').style.color = "#7165E3"
      document.getElementById('dropdownbutton').style.borderRadius = "5px 5px 0px 0px"
      document.getElementById('dropdownbutton').style.border = "1px solid #CCC"
    }
    else {
      document.getElementById('avatardropdownmenu').style.display = 'none';
      document.getElementById('dropdownbutton').style.background = "#fff"
      document.getElementById('dropdownbutton').style.color = "#989898"
      document.getElementById('dropdownbutton').style.borderRadius = "5px"
      document.getElementById('dropdownbutton').style.border = "1px solid #DBDBDB"
    }
  }
  const HandleSubmit = (e) => {
    e.preventDefault();
  //  fetch('http://localhost:3001/users').then(response => response.json()).then(data => console.log(data));
    let data = user;
    data.avatar = (user.avatar.substr(2)).substr(0,1).toUpperCase() + (user.avatar.substr(2)).substr(0, user.avatar.length-6).substr(1);
    data.usertype = user.type;
    console.log(user.type)
    axios.post('http://localhost:3001/users', data).then((response) => { console.log(response);localStorage.setItem("token", response.data.jwt); if(response.status == 200) { window.location = 'http://localhost:3000/' } }).catch(error => { console.log(error.response) });
  }
  return(
    <>
    <div className={signup.headercontainer}> 
    <div>
        <h2> Awesome, {props.user.name.split(' ')[0]}. Just to finish up</h2>
         <h1> Choose an Avatar </h1>
    </div>
    <div className={signup.progressContainer}>
      <p> Last Step! </p>
      <div className={signup.progress}>
        <div />
    </div>
    </div>
    </div>
          <div style={{display: "flex"}} >
          <table>
            <tr>
                <td className={signup.label} id="name">
                </td>
              </tr>
              <tr>
                <td>
                </td>
                <td >
                  <button style={{marginLeft: "-20px"}} name="avatar" id="dropdownbutton" onClick={toggledropdown} className={signup.dropdown} > 
                    <FontAwesomeIcon id="avatar_icon" className={ signup.icondropdown } icon={ faUserAstronaut } />
                      <span name="avatar"> {user.avatar? (user.avatar.substr(2)).substr(0,1).toUpperCase() + (user.avatar.substr(2)).substr(0, user.avatar.length-6).substr(1)   : 'Select Avatar' } </span>
                    <FontAwesomeIcon name="avatar" id="type_icon" className={ signup.icondropdownright } icon={ faChevronDown } />
                    </button>
                  <div id="avatardropdownmenu" className={signup.avatardropdownmenu}>
                    <div onClick={handleField} value="./whale.png" name="avatar"> <img onClick={handleField} value="./whale.png" name="avatar" src='./whale.png' /> </div>
                    <div onClick={handleField} value="./deer.png" name="avatar"> <img onClick={handleField} value="./deer.png" name="avatar" src='./deer.png' /> </div>
                    <div onClick={handleField} value="./pug.png" name="avatar" > <img onClick={handleField} value="./pug.png" name="avatar"  src='./pug.png' /> </div>
                    <div onClick={handleField} value="./crab.png" name="avatar"> <img onClick={handleField} value="./crab.png" name="avatar" src='./crab.png' /> </div>
                  </div> 
                </td>
              </tr> 
              <tr>
                <td className={signup.label}>
                </td>
              </tr>
              <tr>
                <td>
                </td>
                <td>
                  {user.avatar? <img className={signup.avatar} src={user.avatar} /> : <img className={signup.avatar} src='./whale.png' />}
                </td>
              </tr> 
              <tr style={{visibility: "hidden"}}>
                <td className={signup.label} id="password">
                  Password
                </td>
              </tr>
              <tr style={{visibility: "hidden"}}>
                <td>
                  <FontAwesomeIcon id="password_icon" className={ signup.icon } icon={ faLock } />
                </td>
                <td>
                  <input onChange={handleField} value={user.password} onFocus={highLight} onBlur={dehighLight} type="password" name="password" placeholder="password" /> <br />
                </td>
              </tr>
            </table>
            <table>
            <tr>
                <td className={signup.label}>
                </td>
              </tr>
              <tr>
                <td>
                </td>
                <td>
                  
                </td>
              </tr> 
              <tr>
                <td className={signup.label}>
                  
                </td>
              </tr>
              <tr>
                <td>
                </td>
                <td>
                  <span className={signup.tabletext}> Almost there, {props.user.name.split(' ')[0]}!  Just check your email for the authorization code we've sent you. </span>
                </td>
              </tr> 
              <tr>
                <td className={signup.label} id="confirmpassword">
                  Code
                </td>
              </tr>
              <tr>
                <td>
                  <FontAwesomeIcon id="confirmpassword_icon" className={ signup.icon } icon={ faUserSecret } />
                </td>
                <td>
                  <input onChange={handleField} value={user.confirmpassword} onFocus={highLight} onBlur={dehighLight} type="password" name="confirmpassword" placeholder="authorization code" /> <br />
                </td>
              </tr>
            </table>
            </div>
            <div style={{display: "flex", marginTop: "100px"}}>
              <button className={signup.inverted} onClick={() => props.back(user)} > Back </button> 
              <button onClick={HandleSubmit} className={signup.inverted} > Finish </button> 
            </div>
            
      </>

  )
}