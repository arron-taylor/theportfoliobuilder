import { useEffect, useState } from "react"
import {Switch, Route} from "react-router-dom"
import admin from '../../admin.module.css'
import  Toolbar  from '../../components/Toolbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAstronaut, faChevronDown, faLock, faUser, faLayerGroup, faUserTag, faAt } from '@fortawesome/free-solid-svg-icons'
import FocusHandler from '../../modules/FocusHandler'
import axios from 'axios'

export default function ProfileSettings(props) {
	const [user, setUser] = useState({id: props.user.id, type: props.user.usertype, name: props.user.name, email: props.user.email, password: props.user.password, avatar: './pug.png', username: props.user.username});
  const [focused, setFocus] = useState();
	const handleField = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({ ...prevState,[name]: value}));
  }
  const handleClick = (e) => {
    const name = e.target.getAttribute('name');
      let value = e.target.getAttribute('value');
      if(name === 'avatar') {
         document.getElementById('avatardropdownmenu').style.display = 'none';
        document.getElementById('avatardropdownbutton').style.background = "#fff"
        document.getElementById('avatardropdownbutton').style.color = "#989898"
        document.getElementById('avatardropdownbutton').style.borderRadius = "5px"
        document.getElementById('avatardropdownbutton').style.border = "1px solid #DBDBDB"
      }
     else if(name === 'type') {
         document.getElementById('dropdownmenu').style.display = 'none';
        document.getElementById('dropdownbutton').style.background = "#fff"
        document.getElementById('dropdownbutton').style.color = "#989898"
        document.getElementById('dropdownbutton').style.borderRadius = "5px"
        document.getElementById('dropdownbutton').style.border = "1px solid #DBDBDB"
     }
   //   (user.avatar.substr(2)).substr(0,1).toUpperCase() + (user.avatar.substr(2)).substr(0, user.avatar.length-6).substr(1)
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
  const toggledropdown = (e) => {
     const name = e.target.getAttribute('name');
      let value = e.target.getAttribute('value');
      if(name == 'avatar') {
        if(document.getElementById('avatardropdownmenu').style.display === 'none') {
          document.getElementById('avatardropdownmenu').style.display = 'flex';
          document.getElementById('avatardropdownbutton').style.background = "#EFEFEF"
          document.getElementById('avatardropdownbutton').style.color = "#7165E3"
          document.getElementById('avatardropdownbutton').style.borderRadius = "5px 5px 0px 0px"
          document.getElementById('avatardropdownbutton').style.border = "1px solid #CCC"
        }
        else {
          document.getElementById('avatardropdownmenu').style.display = 'none';
          document.getElementById('avatardropdownbutton').style.background = "#fff"
          document.getElementById('avatardropdownbutton').style.color = "#989898"
          document.getElementById('avatardropdownbutton').style.borderRadius = "5px"
          document.getElementById('avatardropdownbutton').style.border = "1px solid #DBDBDB"
        }
      }
      else {
        if(document.getElementById('dropdownmenu').style.display === 'none') {
          document.getElementById('dropdownmenu').style.display = 'flex';
          document.getElementById('dropdownbutton').style.background = "#EFEFEF"
          document.getElementById('dropdownbutton').style.color = "#7165E3"
          document.getElementById('dropdownbutton').style.borderRadius = "5px 5px 0px 0px"
          document.getElementById('dropdownbutton').style.border = "1px solid #CCC"
        }
        else {
          document.getElementById('dropdownmenu').style.display = 'none';
          document.getElementById('dropdownbutton').style.background = "#fff"
          document.getElementById('dropdownbutton').style.color = "#989898"
          document.getElementById('dropdownbutton').style.borderRadius = "5px"
          document.getElementById('dropdownbutton').style.border = "1px solid #DBDBDB"
        }
      }
  }
  useEffect( () => {
    FocusHandler(focused)
  });
  const avatars = [{name: 'bunny'}, {name:'whale'}, {name:'deer'}, {name:'rhino'}, {name:'pug'}, {name:'crab'}, {name:'dino'}, {name:'alien'}];
  const HandleSubmit = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token")
  //  fetch('http://localhost:3001/users').then(response => response.json()).then(data => console.log(data));
    let data = user;
    data.avatar = (user.avatar.substr(2)).substr(0,1).toUpperCase() + (user.avatar.substr(2)).substr(0, user.avatar.length-6).substr(1);
    data.usertype = user.type;
    axios.post('http://localhost:3001/edituser', data, {headers: {Authorization: 'Bearer ' + token }}).then((response) => { console.log(response);if(response.status == 204) { window.location = 'http://localhost:3000/settings' } }).catch(error => { console.log(error.response) });
  }
	return(
	<>
		<div className={admin.col1}>
					<h1> Your Avatar </h1>
					<div style={{display: "flex"}} >
		           <img className={admin.avatar} src={user.avatar} />
		           <button style={{marginLeft: "-20px"}} name="avatar" id="avatardropdownbutton" onClick={toggledropdown} className={admin.dropdown} > 
		            <FontAwesomeIcon id="avatar_icon" className={ admin.icondropdown } icon={ faUserAstronaut } />
		              <span name="avatar"> {user.avatar? (user.avatar.substr(2)).substr(0,1).toUpperCase() + (user.avatar.substr(2)).substr(0, user.avatar.length-6).substr(1)   : 'Select Avatar' } </span>
		            <FontAwesomeIcon name="avatar" id="type_icon" className={ admin.icondropdownright } icon={ faChevronDown } />
		            </button>
		          <div id="avatardropdownmenu" className={admin.avatardropdownmenu}>
		            <div onClick={handleClick} value="./whale.png" name="avatar"> <img onClick={handleClick} value="./whale.png" name="avatar" src='./whale.png' /> </div>
		            <div onClick={handleClick} value="./deer.png" name="avatar"> <img onClick={handleClick} value="./deer.png" name="avatar" src='./deer.png' /> </div>
		            <div onClick={handleClick} value="./rhino.png" name="avatar"> <img onClick={handleClick} value="./rhino.png" name="avatar" src='./rhino.png' /> </div>
		            <div onClick={handleClick} value="./pug.png" name="avatar" > <img onClick={handleClick} value="./pug.png" name="avatar"  src='./pug.png' /> </div>
		            <div onClick={handleClick} value="./crab.png" name="avatar"> <img onClick={handleClick} value="./crab.png" name="avatar" src='./crab.png' /> </div>
		            <div onClick={handleClick} value="./velociraptor.png" name="avatar"> <img onClick={handleClick} value="./velociraptor.png" name="avatar" src='./velociraptor.png' /> </div>
		            <div onClick={handleClick} value="./alien.png" name="avatar"> <img onClick={handleClick} value="./alien.png" name="avatar" src='./alien.png' /> </div>
		            <div onClick={handleClick} value="./bunny.png" name="avatar"> <img onClick={handleClick} value="./bunny.png" name="avatar" src='./bunny.png' /> </div>
		            <div onClick={handleClick} value="./pterodactyl.png" name="avatar"> <img onClick={handleClick} value="./pterodactyl.png" name="avatar" src='./pterodactyl.png' /> </div>
		          </div> 
		       </div>
		    </div>
		    <div className={admin.col2} >
          <table >
            <tr>
                <td className={admin.label} id="name">
                  Full Name
                </td>
              </tr>
              <tr>
                <td>
                  <FontAwesomeIcon id="name_icon" className={ admin.icon } icon={ faUser } />
                </td>
                <td>
                  <input onChange={handleField} value={user.name} onFocus={highLight} onBlur={dehighLight} type="text" name="name" placeholder="your full name" /> 
                </td>
              </tr> 
              <tr>
                <td className={admin.label} id="email">
                  Email
                </td>
              </tr>
              <tr>
                <td>
                  <FontAwesomeIcon id="email_icon" className={ admin.icon } icon={ faAt } />
                </td>
                <td>
                  <input onChange={handleField} value={user.email} onFocus={highLight} onBlur={dehighLight} type="text" name="email" placeholder="your email" /> 
                </td>
              </tr> 
              <tr>
                <td className={admin.label} id="password">
                  Password
                </td>
              </tr>
              <tr>
                <td>
                  <FontAwesomeIcon id="password_icon" className={ admin.icon } icon={ faLock } />
                </td>
                <td>
                  <input onChange={handleField} value={user.password} onFocus={highLight} onBlur={dehighLight} type="password" name="password" placeholder="password" /> <br />
                </td>
                </tr>
                <tr>
                  <td>
                  <span className={admin.lastchange}>  Last Changed: At account creation</span>
                  </td>
              </tr>
            </table>
            <table>
            <tr>
                <td className={admin.label} id="type">
                  I am a...
                </td>
              </tr>
              <tr>
              <td> </td> </tr>
              <tr> <td> </td> 
                <td>
                  <button name="type" id="dropdownbutton" onClick={toggledropdown} className={admin.dropdownaccount} onChange={handleField} placeholder="your full name"> 
                    <FontAwesomeIcon name="type" id="type_icon" className={ admin.icondropdown } icon={ faLayerGroup } />
                      <span name="type"> {user.type? user.type : 'Account Type' } </span>
                    <FontAwesomeIcon name="type" id="type_icon" className={ admin.icondropdownright } icon={ faChevronDown } />
                    </button>
                  <div id="dropdownmenu" className={admin.dropdownmenu}>
                    <div onClick={handleClick} value="Developer" name="type"> Developer </div>
                    <div onClick={handleClick} value="Illustrator" name="type"> Illustrator </div>
                    <div onClick={handleClick} value="Musical Artist" name="type"> Musical Artist </div>
                    <div onClick={handleClick} value="Photographer" name="type"> Photographer </div>
                  </div> 
                </td>
              </tr>
              <tr>
                <td className={admin.label} id="username">
                  Username
                </td>
              </tr>
              <tr>
                <td>
                  <FontAwesomeIcon id="username_icon" className={ admin.icon } icon={ faUserTag } />
                </td>
                <td>
                  <input onChange={handleField} value={user.username} onFocus={highLight} onBlur={dehighLight} type="text" name="username" placeholder="your username" /> 
                </td>
              </tr>  
            </table>
            </div>
            <button className={admin.invert} > Deactivate Account </button> 
            <button className={admin.button} onClick={HandleSubmit}> Save Changes </button> 
	</>
	)
}