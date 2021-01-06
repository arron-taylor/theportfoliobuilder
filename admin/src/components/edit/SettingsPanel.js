import React from 'react';
import { Link } from 'react-router-dom'
import { gql, useQuery } from "@apollo/client";
import edit from '../../edit.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Button } from './Button'
import { ButtonSettings } from './Button'
import Text  from './Text'
import { TextSettings }  from './Text'
import { useEditor } from "@craftjs/core";
import { Toolbox } from './Toolbox'

export default function SettingsPanel(props) {

  const { actions, selected } = useEditor((state, query) => {
    const currentNodeId = state.events.selected;
    let selected;
    if ( currentNodeId ) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings, 
         isDeletable: query.node(currentNodeId).isDeletable()
      };
    }
    return {
      selected
    }
  });
	return selected? ( 
		<div className={edit.SettingsPanel}>
     <div className={edit.header}> 
     	<h1 className={edit.title}> { selected.name } </h1> <FontAwesomeIcon className={edit.x} icon={faTimes} />
     </div>
     <div className={edit.body}> 
     {	selected.settings && React.createElement(selected.settings, {delete: () => { actions.delete(selected.id)}})  }
	   </div>
	   
    </div>  
	) : null
}