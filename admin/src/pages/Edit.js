import { Link, useParams } from "react-router-dom"; 
import { gql, useQuery } from "@apollo/client";
import edit from '../edit.module.css';
import axios from 'axios'
import { useState, useEffect } from 'react';
import  Toolbar  from '../components/Toolbar'
import  Alert  from '../components/Alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faThLarge, faCube, faPlug, faFileImage, faPalette, faSwatchbook, faSlidersH } from '@fortawesome/free-solid-svg-icons'

const barOptions = [{name: 'Pages', icon:  faThLarge  }, {name: 'Container', icon: faCube}, {name: 'Plugin', icon: faPlug}, {name: 'Media', icon: faFileImage}, {name: 'Palette', icon: faPalette}, {name: 'Templates', icon: faSwatchbook}, {name: 'Settings', icon: faSlidersH}];
let pathname = window.location.pathname.substring(1).slice(5);
let current = pathname.charAt(0).toUpperCase() + pathname.slice(1);

const PAGES = gql`
    query UsersPages($id: ID) {
      userspages(id:$id) {
        id
        name
      }
    }`;

export default function Edit(props) {

const [currentTab, setTab] = useState({current: 'closed'});

  useEffect( () => {
    console.log(currentTab.current)
    if(currentTab.current != 'closed') {
      document.getElementById('toolbar_left').style.width = '450px'
    }
    else {
      document.getElementById('toolbar_left').style.width = '73px'
    }
  } );
  const dothing = (e) => {
    setTab({current: e});
    console.log(currentTab)
  }
  return (
    <div className={edit.container}>
      <div className={edit.toolbar_left} id='toolbar_left'>
        <div className={edit.toolbar_left_items}>
        { barOptions.map( ( label ) => {
            let link = '/edit/' + label.name.toLowerCase();
            return( 
              label.name == currentTab.current? 
               <FontAwesomeIcon onClick={() => dothing('closed')} className={ edit.toolbar_icon_active } icon={ label.icon } /> :
              <Link onClick={() => dothing(label.name)}> <FontAwesomeIcon className={ edit.toolbar_icon } icon={ label.icon } /></Link> ) 
          }) }
        </div>
        <div className={edit.content}> 
          <h1> { currentTab.current } <FontAwesomeIcon onClick={() => dothing('closed')} className={edit.icon} icon={faChevronLeft} /> </h1>
          <div className={edit.body} /> 
        </div>
      </div>
      <div className={edit.toolbar_bottom}>
      </div>
    </div>
  )
}