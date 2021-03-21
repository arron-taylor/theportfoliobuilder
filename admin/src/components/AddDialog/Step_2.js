import { useState, useEffect } from 'react';
import admin from '../../admin.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignature } from '@fortawesome/free-solid-svg-icons'
import login from '../../login.module.css';
import axios from 'axios';
import lz from "lzutf8";
import FocusHandler from '../../modules/FocusHandler'

export default function Step_2() {
	return(
	<>
			<h1> Single New Page </h1>									
				<div style={{display: 'flex', alignItems:'center',height: '100px', width:'450px', justifyContent:'space-around', margin: '0px auto'}}>
								
							</div>
					<div className={admin.pagetemplateContainer}>
						<div className={admin.header}> Would you like a template? </div>
							<div className={admin.templates}>
								<div /> <div /> <div />
							</div>
					</div>
	</>
						)
			}
