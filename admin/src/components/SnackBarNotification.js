import style from '../styles.module.css';
import { useState } from 'react';
import Avatar from './Avatar'
import BarLabels from './BarLabels'
import admin from '../admin.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import lz from "lzutf8";
import copy from 'copy-to-clipboard';

export default function SnackBarNotification(props) {

	const [type, setType] = useState(props.type);
 	const [statetoload, sethestatetoload] = useState(null);

	const closeprompt = () => {
   	console.log(props.page);
   	const alert_type = 'alertbox';
   	alert = document.getElementById(alert_type);
   	alert.style.display = 'none';
   }

  const setstatetoload = (e) => {
    sethestatetoload(e.target.value)
    console.log(statetoload)
  }

   	return (
		<div id="SnackBarNotification" style={{"-webkit-transition": "all .5s ease-in-out", "opacity": 0, top: "-50px"}}>
				<div style={{"z-index": 5}}>
					<div className={admin.SnackBarNotification} > 
						
						<div className={admin.content}> 
							<p> Your page has been saved.</p>
						</div>
						
					</div>
				</div>
			</div>
		)
   
	}
