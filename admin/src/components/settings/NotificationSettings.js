import { useEffect, useState } from "react"
import {Switch, Route} from "react-router-dom"
import admin from '../../admin.module.css'
import  Toolbar  from '../../components/Toolbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAstronaut, faChevronDown, faLock, faUser, faLayerGroup, faUserTag, faAt } from '@fortawesome/free-solid-svg-icons'
import FocusHandler from '../../modules/FocusHandler'
import axios from 'axios'

export default function NotificationSettings(props) {
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
        <h1> Notification Settings </h1>
        <table>
          <tr>
            <td className={admin.labellong} id="type">
              Email me when followed
            </td>
          </tr>
          <tr>
              <td>
              <label className={admin.toggleswitch}>
                <input type="checkbox"  /> 
                <span className={admin.toggleswitchslider} >
                 </span>
              </label>
            </td>
            </tr>
      </table> 
  </div>
  <div className={admin.col2} >
        <h1> Privacy Settings </h1>
    <table >
      <tr>
          <td className={admin.labellong}>
            Show my pages in search
          </td>
        </tr>
        <tr>
          <td>
            <label className={admin.toggleswitch}>
              <input type="checkbox"  /> 
              <span className={admin.toggleswitchslider} >
               </span>
            </label>
          </td>
        </tr> 
      </table>
      
      </div>
    <button className={admin.button} onClick={HandleSubmit}> Save Changes </button> 
	</>
	)
}