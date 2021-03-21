import { useState, useEffect } from 'react';
import admin from '../../admin.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignature } from '@fortawesome/free-solid-svg-icons'
import login from '../../login.module.css';
import axios from 'axios';
import lz from "lzutf8";
import FocusHandler from '../../modules/FocusHandler'
import Step1 from './Step_1'
import Step2 from './Step_2'
import Step3 from './Step_3' 

export default function AddDialog(props) {

  const toSecond = (changed) => {
					
			document.getElementById('alertbox').style.height = '200px'
  	document.getElementById('alertbox_inner').style.opacity = 0 
		setTimeout(() => {	
  		document.getElementById('alertbox_inner').style.opacity = 1 
			setStep(<Step2 next={toLast} back={toFirst} kind={changed} />)
	}, 250)
 		setTimeout(() => {
  	document.getElementById('alertbox_inner').style.opacity = 1 
		}, 500)
  }
  const toFirst = (changed) => {
      setStep(<Step1 setUser={setUser} user={changed} next={toSecond} />)
  }
  const toLast = (changed) => {
    setTimeout(() => {
     setStep(<Step3 back={toSecond} user={changed} />)
    }, 250)
  }
	const closePrompt = () => {
		document.getElementById('addBox').style.display = 'none'
		document.getElementById('alertbox').style.height = '400px'
		setStep(<Step1 next={toSecond} />)
	}
  const [step, setStep] = useState(<Step1 next={toSecond} />);
	const [user, setUser] = useState()
	return(
		<>
			<div className={admin.addcontent}> 
				{step}
			</div>
			<div className={admin.actionbuttons}> 
				<button onClick={closePrompt} className={admin.solid}> Cancel </button>
				<button onClick={() => props.create} className={admin.invert}> Create </button>
			</div>
		</>
	)
}
