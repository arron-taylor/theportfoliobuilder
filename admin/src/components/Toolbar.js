import style from '../styles.module.css';
import { useState } from 'react';
import Avatar from './Avatar'
import BarLabels from './BarLabels'
import admin from '../admin.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH} from '@fortawesome/free-solid-svg-icons'

export default function Toolbar(props) {
	return (
		<div className={admin.Toolbar}>
			<button className={admin.add}> <FontAwesomeIcon className={ style.icon } icon={ faEllipsisH } /> </button>
		</div>
	)
}