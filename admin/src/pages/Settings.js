import { gql, useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import admin from '../admin.module.css'
import  Toolbar  from '../components/Toolbar'
import Greeting from '../components/dashboard/Greeting'
import signup from '../signup.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAstronaut, faChevronDown, faUserSecret, faAt, faLock, faUser, faLayerGroup, faBuilding, faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import FocusHandler from '../modules/FocusHandler'

const CURRENT_POST = gql`
	  query Post($id: ID!) {
	  post(id: $id) {
	    title
	    body
	  }
	}
	`;

export default function Settings(props) {
	const [user, setUser] = useState({name: props.user.name, email: props.user.email, password: props.user.password, avatar: './pug.png'});
  const [focused, setFocus] = useState();
	const handleField = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({ ...prevState,[name]: value}));
  }
  const handleClick = (e) => {
      document.getElementById('avatardropdownmenu').style.display = 'none';
      document.getElementById('dropdownbutton').style.background = "#fff"
      document.getElementById('dropdownbutton').style.color = "#989898"
      document.getElementById('dropdownbutton').style.borderRadius = "5px"
      document.getElementById('dropdownbutton').style.border = "1px solid #DBDBDB"
      const name = e.target.getAttribute('name');
      let value = e.target.getAttribute('value');
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
  const toggledropdown = () => {
    if(document.getElementById('avatardropdownmenu').style.display === 'none') {
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
  useEffect( () => {
    FocusHandler(focused)
  });
	return (
		<div className={admin.container}>
		<Toolbar type='settings' />
		<div className={admin.settingscontainer}>
				<div className={admin.col1}>
					<h1> Your Avatar </h1>
					<div style={{display: "flex"}} >
		           <img className={admin.avatar} src={user.avatar} />
		           <button style={{marginLeft: "-20px"}} name="avatar" id="dropdownbutton" onClick={toggledropdown} className={admin.dropdown} > 
		            <FontAwesomeIcon id="avatar_icon" className={ admin.icondropdown } icon={ faUserAstronaut } />
		              <span name="avatar"> {user.avatar? (user.avatar.substr(2)).substr(0,1).toUpperCase() + (user.avatar.substr(2)).substr(0, user.avatar.length-6).substr(1)   : 'Select Avatar' } </span>
		            <FontAwesomeIcon name="avatar" id="type_icon" className={ admin.icondropdownright } icon={ faChevronDown } />
		            </button>
		          <div id="avatardropdownmenu" className={admin.avatardropdownmenu}>
		            <div onClick={handleClick} value="./whale.png" name="avatar"> <img onClick={handleClick} value="./whale.png" name="avatar" src='./whale.png' /> </div>
		            <div onClick={handleClick} value="./deer.png" name="avatar"> <img onClick={handleClick} value="./deer.png" name="avatar" src='./deer.png' /> </div>
		            <div onClick={handleClick} value="./pug.png" name="avatar" > <img onClick={handleClick} value="./pug.png" name="avatar"  src='./pug.png' /> </div>
		            <div onClick={handleClick} value="./crab.png" name="avatar"> <img onClick={handleClick} value="./crab.png" name="avatar" src='./crab.png' /> </div>
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
                <td className={admin.label} id="location">
                  Location
                </td>
              </tr>
              <tr>
                <td>
                  <FontAwesomeIcon id="location_icon" className={ admin.icon } icon={ faLocationArrow } />
                </td>
                <td>
                  <input onChange={handleField} value={user.location} onFocus={highLight} onBlur={dehighLight} type="text" name="location" placeholder="your location" /> 
                </td>
              </tr> 
              <tr>
                <td className={admin.label} id="password">
                  Biography
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
                    <div onClick={handleField} value="Developer" name="type"> Developer </div>
                    <div onClick={handleField} value="Illustrator" name="type"> Illustrator </div>
                    <div onClick={handleField} value="Musical Artist" name="type"> Musical Artist </div>
                    <div onClick={handleField} value="Photographer" name="type"> Photographer </div>
                  </div> 
                </td>
              </tr>
              <tr>
                <td className={admin.label} id="company">
                  Company
                </td>
              </tr>
              <tr>
                <td>
                  <FontAwesomeIcon id="company_icon" className={ admin.icon } icon={ faBuilding } />
                </td>
                <td>
                  <input onChange={handleField} value={user.company} onFocus={highLight} onBlur={dehighLight} type="text" name="company" placeholder="your company name" /> 
                </td>
              </tr>  
            </table>
            </div>
            <button className={admin.button} > Save Changes </button> 
			</div>
		</div>
	)
}