import admin from '../admin.module.css';
import CheckList from '../components/dashboard/CheckList'
import Greeting from '../components/dashboard/Greeting'

export default function Dashboard(props) {
	return (
		<div className={admin.container}>
			<Greeting user={props.user} />
			<CheckList />
		</div>
	)
}