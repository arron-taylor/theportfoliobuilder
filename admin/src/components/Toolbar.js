import style from '../styles.module.css';
import { useState } from 'react';
import Avatar from './Avatar'
import BarLabels from './BarLabels'
import admin from '../admin.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faPlus } from '@fortawesome/free-solid-svg-icons'
import  AddPage  from './AddPage'

export default function Toolbar(props) {

	 const addPrompt = (item) => {
    document.getElementById("addBox").style.display = 'block';
   }

	return (
		<div className={admin.Toolbar}>
			<button onClick={addPrompt} className={admin.add}> <FontAwesomeIcon className={ style.icon } icon={ faPlus } /> </button>
			<button className={admin.add}> <FontAwesomeIcon className={ style.icon } icon={ faEllipsisH } /> </button>

      <AddPage type="add"  />

		</div>
	)
}