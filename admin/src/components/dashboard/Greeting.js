import style from '../../styles.module.css';

export default function CheckList(props) {
	
	return (
		<div className={style.greeting}>
			Welcome, {props.user.name.split(' ')[0]}
		</div>
	)
}