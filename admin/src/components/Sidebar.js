import style from '../styles.module.css';
import { useState } from 'react';
import Avatar from './Avatar'
import BarLabels from './BarLabels'

export default function Sidebar(props) {
	const logout = () => {
		localStorage.removeItem('token');
		window.location = 'http://localhost:3000';
	}
  const [user, setUser] = useState({name:props.user.name, email:props.user.email, password:props.user.password,user_type:props.user.type, avatar:'../../whale.png', avatarname: 'Avatar'}); 
	
	return (
		<div className={style.SideBar}>
			<Avatar />
			<BarLabels tab={ props.tab } />
			<button onClick={logout}> Logout </button>
		</div>
	)
}