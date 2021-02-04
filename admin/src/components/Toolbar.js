import style from '../styles.module.css';
import admin from '../admin.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faPlus, faIdCard, faBell, faAt, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import  AddPage  from './AddPage'

export default function Toolbar(props) {

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
			<button onClick={addPrompt} className={admin.tabbutton}> 
			  <FontAwesomeIcon name="type" id="type_icon" className={ admin.iconleft } icon={ faIdCard } />
		    <span name="type"> Profile </span>
		  </button>
		  <button onClick={addPrompt} className={admin.tabbutton_inactive}> 
			  <FontAwesomeIcon name="type" id="type_icon" className={ admin.iconleft } icon={ faBell } />
		    <span name="type"> Notifications and Privacy </span>
		  </button>
		  <button onClick={addPrompt} className={admin.tabbutton_inactive}> 
			  <FontAwesomeIcon name="type" id="type_icon" className={ admin.iconleft } icon={ faPowerOff } />
		    <span name="type"> Advanced </span>
		  </button>
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