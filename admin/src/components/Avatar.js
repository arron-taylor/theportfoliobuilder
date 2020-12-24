import style from '../styles.module.css';
import { gql, useQuery } from "@apollo/client";

export default function Avatar() {
	
	return (
		<div>
			<div className={style.avatar} />
			<div className={style.fullname}> Arron Taylor </div>
			<div className={style.accountlevel}> Full Access Account </div>
		</div>
	)
}