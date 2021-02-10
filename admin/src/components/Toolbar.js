import style from '../styles.module.css';
import admin from '../admin.module.css';
import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faPlus, faIdCard, faBell, faAt, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import  AddPage  from './AddPage'
import  ProfileSettings  from './settings/ProfileSettings'
import  NotificationSettings  from './settings/NotificationSettings'
import  AdvancedSettings from './settings/AdvancedSettings'

export default function Toolbar(props) {
	const [current, setTab] = useState('Profile');	
	const tabdata = [{name: "Profile", onclick:<ProfileSettings name='profile' user={props.user} />, icon: faIdCard}, {name: "Notifications and Privacy", onclick:<NotificationSettings name='notification' user={props.user} />, icon: faBell}, {name: "Advanced", onclick:<AdvancedSettings name='advanced' user={props.user} />, icon: faPowerOff}]
	 const addPrompt = (item) => {
    document.getElementById("addBox").style.display = 'block';
   }
   if(props.type) {
   	if(props.type == 'settings') {

   	}
   }
	return (
		<div className={admin.Toolbar}>
		{props.type? <>
			<h1> Account Settings </h1>

			{tabdata.map((tab) => {
				return <>
				{tab.name === current? 
				<button onClick={() => {props.setTab( tab.onclick ); setTab(tab.name)}} className={admin.tabbutton}> 
				  <FontAwesomeIcon name="type" id="type_icon" className={ admin.iconleft } icon={ tab.icon } />
			    <span name="type"> {tab.name} </span>
			  </button> :
			  <button onClick={() => {props.setTab( tab.onclick ); setTab(tab.name)}} className={admin.tabbutton_inactive}> 
				  <FontAwesomeIcon name="type" id="type_icon" className={ admin.iconleft } icon={ tab.icon } />
			    <span name="type"> {tab.name} </span>
			  </button> 
					}
			   </>
			})}

			<button className={admin.add}> <FontAwesomeIcon className={ style.icon } icon={ faEllipsisH } /> </button>
			</>
			: <> <h1> My Pages </h1>
			<button onClick={addPrompt} className={admin.addbutton}> 
	    <span name="type"> Create Page </span>
	  <FontAwesomeIcon name="type" id="type_icon" className={ admin.addiconright } icon={ faPlus } />
	  </button>
		<button className={admin.add}> <FontAwesomeIcon className={ style.icon } icon={ faEllipsisH } /> </button>

	  <AddPage type="add"  /> </>
		}
		

		</div>
	)
}