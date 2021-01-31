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
import { faChevronDown, faAt, faLock, faUser, faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import FocusHandler from '../../modules/FocusHandler'
import FormValidate from '../../modules/FormValidate'


export default function Step2(props) {

  const [user, setUser] = useState({name: props.user.name, email: props.user.email, password: props.user.password, confirmemail: '', confirmpassword: ''});
  const [focused, setFocus] = useState({email:false, password:false});
  useEffect( () => {
    FocusHandler(focused)
  });
  const handleField = (e) => {
    if(e.target.getAttribute('name') == 'type') {
      const name = e.target.getAttribute('name');
      const value = e.target.getAttribute('value');
      setUser(prevState => ({ ...prevState,[name]: value}));
      toggledropdown(e);
    }
    else {
      const { name, value } = e.target;
      setUser(prevState => ({ ...prevState,[name]: value}));
    }
  }
  const highLight = (e) => {
    if(e.target.getAttribute('name') === 'type') {
      document.getElementById('dropdownmenu').style.display = 'flex'
    }
    else {
      const { name, value } = e.target;
      setFocus(prevState => ({ ...prevState, [name]:true }));
    }
  }
  const dehighLight = (e) => {
    if(e.target.getAttribute('name') === 'type') {
      document.getElementById('dropdownmenu').style.display = 'none'
    }
     else {
      const { name, value } = e.target;
      setFocus(prevState => ({ ...prevState, [name]:false }));
    }
  }
  const toggledropdown = (e) => {
    let toggle = document.getElementById('dropdownmenu').style.display;
    if(toggle === 'none') {
      document.getElementById('dropdownmenu').style.display = 'flex';
      document.getElementById('dropdownbutton').style.background = "#EFEFEF"
      document.getElementById('dropdownbutton').style.color = "#7165E3"
      document.getElementById('dropdownbutton').style.borderRadius = "5px 5px 0px 0px"
      document.getElementById('dropdownbutton').style.border = "1px solid #CCC"
      highLight(e);
    }
    else {
      document.getElementById('dropdownmenu').style.display = 'none';
      document.getElementById('dropdownbutton').style.background = "#fff"
      document.getElementById('dropdownbutton').style.color = "#989898"
      document.getElementById('dropdownbutton').style.borderRadius = "5px"
      document.getElementById('dropdownbutton').style.border = "1px solid #DBDBDB"
      dehighLight(e);
    }
  }
  const nextStep = () => {
    if( user.name && user.confirmemail && user.confirmpassword) {
      if(user.confirmemail !== user.email)  {
        FormValidate(user, 'step2')
      }
      else if(user.confirmpassword !== user.password)  {
        FormValidate(user, 'step2')
      }
      else {
        props.next(user)
      }
    }
    else {
      FormValidate(user, 'step2')
    }
  }
  return(
    <>
    <div className={signup.headercontainer}> 
    <div>
        <h2> Awesome! Hey, {props.user.name.split(' ')[0]}. Please confirm your</h2>
         <h1> Account Settings </h1>
    </div>
    <div className={signup.progressContainer}>
      <p> Almost Done! :) </p>
      <div className={signup.progress}>
        <div style={{width: "66%"}} />
    </div>
    </div>
    </div>
          <div style={{display: "flex"}} >
          <table >
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
                  <input onChange={handleField} value={user.name} onFocus={highLight} onBlur={dehighLight} type="text" name="name" placeholder="your full name" /> 
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
            <table>
            <tr>
                <td className={signup.label} id="type">
                  I am a...
                </td>
              </tr>
              <tr>
                <td>
                </td>
                <td>
                  <button name="type" id="dropdownbutton" onClick={toggledropdown} className={signup.dropdown} onChange={handleField} placeholder="your full name"> 
                    <FontAwesomeIcon name="type" id="type_icon" className={ signup.icondropdown } icon={ faLayerGroup } />
                      <span name="type"> {user.type? user.type : 'Account Type' } </span>
                    <FontAwesomeIcon name="type" id="type_icon" className={ signup.icondropdownright } icon={ faChevronDown } />
                    </button>
                  <div id="dropdownmenu" className={signup.dropdownmenu}>
                    <div onClick={handleField} value="Developer" name="type"> Developer </div>
                    <div onClick={handleField} value="Illustrator" name="type"> Illustrator </div>
                    <div onClick={handleField} value="Musical Artist" name="type"> Musical Artist </div>
                    <div onClick={handleField} value="Photographer" name="type"> Photographer </div>
                  </div> 
                </td>
              </tr> 
              <tr>
                <td className={signup.label} id="confirmemail">
                  Confirm 
                </td>
              </tr>
              <tr>
                <td>
                  <FontAwesomeIcon id="confirmemail_icon" className={ signup.icon } icon={ faAt } />
                </td>
                <td>
                  <input onChange={handleField} value={user.confirmemail} onFocus={highLight} onBlur={dehighLight} type="text" name="confirmemail" placeholder="your email address" /> 
                </td>
              </tr> 
              <tr>
                <td className={signup.label} id="confirmpassword">
                  Confirm 
                </td>
              </tr>
              <tr>
                <td>
                  <FontAwesomeIcon id="confirmpassword_icon" className={ signup.icon } icon={ faLock } />
                </td>
                <td>
                  <input onChange={handleField} value={user.confirmpassword} onFocus={highLight} onBlur={dehighLight} type="password" name="confirmpassword" placeholder="password" /> <br />
                </td>
              </tr>
            </table>
            </div>
            <div style={{display: "flex", marginTop: "100px"}}>
              <button className={signup.inverted} onClick={() => props.back(user)} > Back </button> 
              <button className={signup.button} onClick={nextStep}> Next Step </button> 
            </div>
            
      </>

  )
}