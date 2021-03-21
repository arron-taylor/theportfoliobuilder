import style from '../styles.module.css'
import { useEffect } from 'react'

export default function Content(props) {
	
	const open = props.open
	useEffect(() => {
		if(open) {
			document.getElementById('content').style.marginLeft = '303px'
		}
		else {
			document.getElementById('content').style.marginLeft = '30px'
		}
	}
	)
	return (	
		<div className={style.content}  id="content">
				{ props.children }
		</div>
	)
}
