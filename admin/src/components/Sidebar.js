import style from '../styles.module.css';
import { useState } from 'react';
import Avatar from './Avatar'
import BarLabels from './BarLabels'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft, faChevronRight,  faTachometerAlt, faChartBar, faThLarge, faEnvelope, faCog } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"; 

export default function Sidebar(props) {
	const [open, setOpen] = useState(false);
	const logout = () => {
		localStorage.removeItem('token');
		window.location = 'http://localhost:3000';
	}
		
	const barOptions = [{name: 'Dashboard', icon:  faTachometerAlt  }, {name: 'Analytics', icon: faChartBar}, {name: 'Pages', icon: faThLarge}, {name: 'Inquiries', icon: faEnvelope}, {name: 'Settings', icon: faCog}];
	let pathname = window.location.pathname.substring(1);
	let current = pathname.charAt(0).toUpperCase() + pathname.slice(1);
	return (
	<>
		{props.open? 
		<div className={style.SideBar}>
			<button onClick={props.setOpen} className={style.toggle}> <FontAwesomeIcon icon={faChevronLeft} /> </button>
			<Avatar user={props.user} />
			<BarLabels tab={ props.tab } />
			<button onClick={logout} className={style.logout}> Logout <FontAwesomeIcon icon={faSignOutAlt} /> </button>
		</div> :

		<div className={style.SideBarClosed}>
			<button className={style.toggle}  onClick={props.setOpen}> <FontAwesomeIcon icon={faChevronRight} /> </button>
			<div style={{background: "url(./" +  props.user.avatar + ".png)", backgroundSize: "cover"}} className={style.avatar} />
					{ barOptions.map( ( label ) => {
						return( 
							label.name === current? 
							<div className={ style.labelActive }> <FontAwesomeIcon className={ style.icon } icon={ label.icon } /> </div> :
						 	<Link key={label.name} onClick={ () => props.tab( pathname ) } to={label.name.toLowerCase()}> <div key={label.name} className={ style.label }> <FontAwesomeIcon className={ style.icon } icon={ label.icon } /> </div> </Link>) 
					}) }
			<button onClick={logout} className={style.logout}> <FontAwesomeIcon icon={faSignOutAlt} /> </button>
		</div> 
		}
	</>
	)
}
