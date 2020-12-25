import style from '../styles.module.css';
import { gql, useQuery } from "@apollo/client";

export default function Avatar(props) {
	
	return (
		<div>
			<div className={style.avatar} />
			<div className={style.fullname}> {props.user.name} </div>
			<div className={style.accountlevel}> Full Access Account </div>
		</div>
	)
}