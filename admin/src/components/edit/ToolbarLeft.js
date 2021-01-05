import { useState } from 'react';
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

	return (
		<div className={edit.toolbar_left} id='toolbar_left'>
      <div className={edit.toolbar_left_items}>
      { barOptions.map( ( label ) => {
          return( 
            label.name == props.currentTab.current? 
            <FontAwesomeIcon onClick={() => props.setTab('closed')} className={ edit.toolbar_icon_active } icon={ label.icon } /> :
            <Link onClick={() => props.setTab(label.name)}> <FontAwesomeIcon className={ edit.toolbar_icon } icon={ label.icon } /></Link> ) 
        }) }
      </div>
      <div className={edit.content}> 
      	
        <h1> { props.currentTab.current } <FontAwesomeIcon onClick={() => props.setTab('closed')} className={edit.icon} icon={faChevronLeft} /> </h1>
        <div className={edit.body}> 
        {
      		props.currentTab.current == 'Pages'? <> 
      			{props.user.pages.map((page) => {  
      				let pageLink = "http://localhost:3000/edit/" +page.id;
      				return <div onClick={() => { window.location = pageLink }} className={edit.page}> { page.name } </div> })
      			} 
      		</> 

      		: console.log('no')
     		 } 

     		 {
     		 	props.currentTab.current == 'Plugin'? 
     		 <Toolbox /> : 
     		 <>no sir</>
     			}
     		 </div> 
      </div>
    </div>
	)
}