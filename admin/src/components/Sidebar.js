import style from '../styles.module.css';
import { useState } from 'react';
import Avatar from './Avatar'
import BarLabels from './BarLabels'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

export default function Sidebar(props) {
	const logout = () => {
		localStorage.removeItem('token');
		window.location = 'http://localhost:3000';
	}
	
	return (
		<div className={style.SideBar}>
			<Avatar user={props.user} />
			<BarLabels tab={ props.tab } />
			<button onClick={logout} className={style.logout}> Logout <FontAwesomeIcon icon={faSignOutAlt} /> </button>
		</div>
	)
}