import style from '../styles.module.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTachometerAlt, faChartBar, faColumns, faEnvelope, faCog } from '@fortawesome/free-solid-svg-icons'
import { useParams, Link } from "react-router-dom"; 

export default function BarLabels(props) {

	const barOptions = [{name: 'Dashboard', icon:  faTachometerAlt  }, {name: 'Analytics', icon: faChartBar}, {name: 'Pages', icon: faColumns}, {name: 'Inquiries', icon: faEnvelope}, {name: 'Settings', icon: faCog}];
	let pathname = window.location.pathname.substring(1);
	let current = pathname.charAt(0).toUpperCase() + pathname.slice(1);

	return (
		<div className={style.BarLabels}>
				<div>
					{ barOptions.map( ( label ) => {
						return( 
							label.name == current? 
							<div className={ style.labelActive }> <FontAwesomeIcon className={ style.icon } icon={ label.icon } /> { label.name }  </div> :
						 	<Link key={label.name} onClick={ () => props.tab( pathname ) } to={label.name.toLowerCase()}> <div key={label.name} className={ style.label }> <FontAwesomeIcon className={ style.icon } icon={ label.icon } /> { label.name } </div> </Link>) 
					}) }
				</div>
		</div>
	)
}