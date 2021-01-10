import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import edit from '../../edit.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faThLarge, faCube, faPlug, faFileImage, faPalette, faSwatchbook, faSlidersH, faDesktop, faSave, faUndo, faRedo } from '@fortawesome/free-solid-svg-icons'
import {Toolbox} from './Toolbox'

const barOptions = [{name: 'Pages', icon:  faThLarge  }, {name: 'Container', icon: faCube}, {name: 'Plugin', icon: faPlug}, {name: 'Media', icon: faFileImage}, {name: 'Palette', icon: faPalette}, {name: 'Templates', icon: faSwatchbook}, {name: 'Settings', icon: faSlidersH}];
let pathname = window.location.pathname.substring(1).slice(5);
let current = pathname.charAt(0).toUpperCase() + pathname.slice(1);

export default function ToolbarLeft(props) {

  const [currentTab, setTab] = useState({current: 'closed'});
  
	useEffect( () => {
    if(currentTab.current != 'closed') {
      document.getElementById('toolbar_left').style.width = '450px'
    }
    else {
      document.getElementById('toolbar_left').style.width = '73px'
    }
  });

	return (
		<div className={edit.toolbar_left}  id='toolbar_left'>
      <div className={edit.toolbar_left_items}>
      { barOptions.map( ( label ) => {
          return( 
            label.name == currentTab.current? 
            <FontAwesomeIcon onClick={() => setTab({'current':'closed'})} className={ edit.toolbar_icon_active } icon={ label.icon } /> :
            <Link onClick={() => setTab({'current':label.name})}> <FontAwesomeIcon className={ edit.toolbar_icon } icon={ label.icon } /></Link> ) 
        }) }
      </div>
      <div className={edit.content}> 
      	
        <h1> { currentTab.current } <FontAwesomeIcon onClick={() => setTab({'current':'closed'})} className={edit.icon} icon={faChevronLeft} /> </h1>
        <div className={edit.body}> 
        {
      		currentTab.current == 'Pages'? <> 
      			{props.user.pages.map((page) => {  
      				let pageLink = "http://localhost:3000/edit/" +page.id;
      				return <div onClick={() => { window.location = pageLink }} className={edit.page}> { page.name } </div> })
      			} 
      		</> 

      		: console.log('no')
     		 } 

     		 {
     		 	currentTab.current == 'Plugin'? 
     		 <Toolbox /> : 
     		 <>no sir</>
     			}
     		 </div> 
      </div>
    </div>
	)
}