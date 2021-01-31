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
import FocusHandler from '../modules/FocusHandler'

export default function AddPage(props) {

  const [user, setUser] = useState({name: '', email: '', isLoggedIn: false});
 	const [statetoload, sethestatetoload] = useState(null);
  const [page, setPage] = useState({page_type: '', page_kind: '', page_layout: '', name: '', id: ''});
  const [focused, setFocus] = useState({name:false});

  useEffect( () => {
    FocusHandler(focused)
  });
	const closeprompt = () => {
   	console.log(props.page);
   	const alert_type = 'addBox';
   	alert = document.getElementById(alert_type);
   	alert.style.display = 'none';
   }
   const createPage = (e) => {
    e.preventDefault();
    let data = page;
    let token = localStorage.getItem("token")
    axios.post(
      'http://localhost:3001/makepage', 
      data, 
      { 
        headers: { 
          Authorization: 'Bearer ' + token 
        }
      }).then((data) => { window.location = '/edit/' + data.data.page.id }).catch(error => { console.log(error.response) });
    }
  const setstatetoload = (e) => {
    sethestatetoload(e.target.value)
    console.log(statetoload)
  }

  const handleField = (e) => {
    const { name, value } = e.target;
    setPage(prevState => ({ ...prevState,[name]: value}));
  }
  const highLight = (e) => {
    const { name, value } = e.target;
    setFocus(prevState => ({ ...prevState, [name]:true }));
  }
  const dehighLight = (e) => {
    const { name, value } = e.target;
    setFocus(prevState => ({ ...prevState, [name]:false }));
  }
 

   	return (
		<div id="addBox" style={{display: 'none'}}>
				<div className={admin.overlay}>
					<div className={admin.alertbox}> 
						<h1> Create New Page </h1>
						<div className={admin.addcontent}> 
              <table>
              <tr>
                <td className={admin.label} id="name">
              Page  Name
                </td>
              </tr>
              <tr>
                <td>
                  <FontAwesomeIcon id="name_icon" className={ login.icon } icon={ faSignature } />
                </td>
                <td>
                  <input onChange={handleField} value={page.name} onFocus={highLight} onBlur={dehighLight} type="text" name="name" placeholder="Name of the page" /> 
                </td>
              </tr> 
            </table>
            </div>
						<div className={admin.actionbuttons}> 
							<button onClick={closeprompt} className={admin.solid}> Cancel </button>
							<button onClick={createPage} className={admin.invert}> Create </button>
						</div>
					</div>
				</div>
			</div>
		)
   
	}
