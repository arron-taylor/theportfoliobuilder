import style from '../styles.module.css';

export default function Content(props) {
	return (
		<div className={style.content}>
				{ props.children }
		</div>
	)
}