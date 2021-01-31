import { useState } from 'react';
import admin from '../admin.module.css';
import axios from 'axios';
import lz from "lzutf8";
import copy from 'copy-to-clipboard';
import { useEditor } from "@craftjs/core";

export default function Template(props) {

 	const [statetoload, sethestatetoload] = useState(null);

 	const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled
  }));

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
		<div id="alertbox" style={{display: 'none'}}>
				<div className={admin.overlay}>
					<div className={admin.alertbox}> 
						<h1> Load Page </h1>
						<div className={admin.content}> 
							<p> <input onChange={setstatetoload} type='text' value={statetoload} placeholder="Enter the saved data here" /></p>
						</div>
						<div className={admin.actionbuttons}> 
							<button onClick={closeprompt} className={admin.solid}> Cancel </button>
							<button onClick={
								() => {
									 const json = lz.decompress(lz.decodeBase64(statetoload));
									 console.log(json)
									 actions.deserialize(json);
								}
							} className={admin.invert}> Load </button>
						</div>
					</div>
				</div>
			</div>
	)
}