import style from '../../styles.module.css';
import { gql, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIdBadge } from '@fortawesome/free-solid-svg-icons'

export default function CheckList(props) {
	
	return (
		<div className={style.greeting}>
			Welcome, {props.user.name.split(' ')[0]}
		</div>
	)
}