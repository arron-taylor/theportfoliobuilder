import style from '../styles.module.css';
import { gql, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIdBadge } from '@fortawesome/free-solid-svg-icons'

export default function Avatar(props) {
	
	return (
		<div>
			<div className={style.avatar} />
			<div className={style.fullname}> {props.user.name} </div>
			<div className={style.accountlevel}> <FontAwesomeIcon className={ style.icon } icon={ faIdBadge } /> Full Access Account </div>
		</div>
	)
}