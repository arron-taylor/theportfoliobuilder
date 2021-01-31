import { useState } from 'react';
import admin from '../admin.module.css';
import axios from 'axios';

export default function SnackBarNotification(props) {
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
