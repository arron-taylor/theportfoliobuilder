import style from '../styles.module.css';
import { useState } from 'react';

export default function Content(props) {
	return (
		<div className={style.content}>
				{ props.children }
		</div>
	)
}