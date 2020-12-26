import style from '../styles.module.css';
import { useState } from 'react';
import Avatar from './Avatar'
import BarLabels from './BarLabels'
import admin from '../admin.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

export default function Alert(props) {
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
   	const alert_type = 'alertbox';
   	alert = document.getElementById(alert_type);
   	alert.style.display = 'none';
   }
	return (
		<div id="alertbox" style={{display: 'none'}}>
				<div className={admin.overlay}>
					<div className={admin.alertbox}> 
						<h1> Delete {props.page.name}? </h1>
						<div className={admin.content}> 
							<p> Are you sure you want to delete this page? Once you press delete there is no way to recover your page.</p>
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