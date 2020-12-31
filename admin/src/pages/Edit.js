import { Link, useParams } from "react-router-dom"; 
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import edit from '../edit.module.css';
import axios from 'axios'
import { useState, useEffect } from 'react';
import  ToolbarLeft  from '../components/edit/ToolbarLeft'
import  Alert  from '../components/Alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faThLarge, faCube, faPlug, faFileImage, faPalette, faSwatchbook, faSlidersH, faDesktop, faSave, faUndo, faRedo } from '@fortawesome/free-solid-svg-icons'


const PAGE = gql`
    query Pages($id: ID) {
      page(id:$id) {
        id
        name
        owner {
          id
          name
          pages {
            id
            name
          }
        }
        components {
          id
          name
        }
      }
    }`;

export default function Edit(props) {

  let { page_id } = useParams();
  const [currentTab, setTab] = useState({current: 'closed'});
  
  useEffect( () => {
    if(currentTab.current != 'closed') {
      document.getElementById('toolbar_left').style.width = '450px'
    }
    else {
      document.getElementById('toolbar_left').style.width = '73px'
    }
  } );

 const dothing = (e) => {
    setTab({current: e});
  }

  const {loading, error, data, refetch} = useQuery(PAGE, {
      variables: { id: page_id }
    });

  if (loading) return <> <div id="toolbar_left" /> </>;
  if (error) return <p> error... </p>;

  return (
    <div className={edit.container}> 
      <h1 className={edit.title}> Page name: {data.page.name} <br /> My components are: {data.page.components.map( comp => {
        return comp.name + ', '
      } )}</h1>

      <ToolbarLeft user={data.page.owner} currentTab={currentTab} setTab={dothing} />

      <div className={edit.toolbar_bottom}>
      <FontAwesomeIcon className={ edit.icon_active } icon={ faDesktop } />
      <FontAwesomeIcon className={ edit.icon } icon={ faSave } />
      <FontAwesomeIcon className={ edit.icon } icon={ faUndo } />
      <FontAwesomeIcon className={ edit.icon } icon={ faRedo } />
      </div>
    </div>
  )
}