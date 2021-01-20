import style from '../styles.module.css';
import { useState, useEffect } from 'react';
import Avatar from './Avatar'
import BarLabels from './BarLabels'
import admin from '../admin.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH} from '@fortawesome/free-solid-svg-icons'
import { faAt, faLock, faSignature } from '@fortawesome/free-solid-svg-icons'
import login from '../login.module.css';
import axios from 'axios';
import lz from "lzutf8";
import copy from 'copy-to-clipboard';

export default function AddPage(props) {

	const [type, setType] = useState(props.type);
  const [user, setUser] = useState({name: '', email: '', isLoggedIn: false});
 	const [statetoload, sethestatetoload] = useState(null);

	const deletepage = () => {
    let token = localStorage.getItem("token")
  	let data = props.page;
  	axios.post(
      'http://localhost:3001/deletepage', 
      data, 
      { 
        headers: { 
          Authorization: 'Bearer ' + token 
        }
      }).then( () => { closeprompt() } ).then( () => { props.refetch() } ).catch(error => { console.log(error.response) });
  }
	const closeprompt = () => {
   	console.log(props.page);
   	const alert_type = 'addBox';
   	alert = document.getElementById(alert_type);
   	alert.style.display = 'none';
   }

  const setstatetoload = (e) => {
    sethestatetoload(e.target.value)
    console.log(statetoload)
  }
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

   	return (
		<div id="addBox" style={{display: 'none'}}>
				<div className={admin.overlay}>
					<div className={admin.alertbox}> 
						<h1> Create New Page </h1>
						<div className={admin.addcontent}> 
              <table>
              <tr>
                <td className={admin.label} id="email">
              Page  Name
                </td>
              </tr>
              <tr>
                <td>
                  <FontAwesomeIcon id="email_icon" className={ login.icon } icon={ faSignature } />
                </td>
                <td>
                  <input onChange={handleField} value={user.email} onFocus={highLight} onBlur={dehighLight} type="text" name="email" placeholder="Name of the page" /> 
                </td>
              </tr> 
              <tr>
                <td className={admin.label} id="password">
                  Page Kind
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
            </div>
						<div className={admin.actionbuttons}> 
							<button onClick={closeprompt} className={admin.solid}> Cancel </button>
							<button onClick={deletepage} className={admin.invert}> Delete </button>
						</div>
					</div>
				</div>
			</div>
		)
   
	}
