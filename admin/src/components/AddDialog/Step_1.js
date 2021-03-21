
import { useState, useEffect } from 'react';
import admin from '../../admin.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignature } from '@fortawesome/free-solid-svg-icons'
import login from '../../login.module.css';
import axios from 'axios';
import lz from "lzutf8";
import FocusHandler from '../../modules/FocusHandler'

export default function Step_1(props) {	
	return(
	<>	
		<h1 style={{display: 'inline-block'}}> Create Page </h1>									
					<div style={{display: 'flex', alignItems:'center', height: '300px', width:'450px', justifyContent:'space-around', margin: '0px auto'}}>
			<div onClick={() => props.next('heres a variable')}  className={admin.pagesingle} style={{height: "200px", width: "150px"}}>
				<div className={admin.label}> Single</div>
				</div>
				<div className={admin.pagebundle} style={{height: "200px", width: "150px"}}>
					<div className={admin.uno} >
						<div className={admin.label}> Bundle </div>
					</div>
					<div className={admin.dos} />
					<div className={admin.tres} />
				</div>					
		</div>
	</>
	)
}
