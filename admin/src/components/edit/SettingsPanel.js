import { useState, useRef } from 'react';
import { Link } from 'react-router-dom'
import { gql, useQuery } from "@apollo/client";
import edit from '../../edit.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Button } from './Button'
import Text  from './Text'
import { useEditor, useNode, Element } from "@craftjs/core";
import { Toolbox } from './Toolbox'

export default function SettingsPanel(props) {

  const { connectors } = useEditor();

	return ( <>
		<div className={edit.SettingsPanel}>
     <div className={edit.header}> 
     	<h1 className={edit.title}> Component Name </h1> <FontAwesomeIcon className={edit.x} icon={faTimes} />
     </div>
     <div className={edit.body}> 
     	<button ref={(ref) => connectors.create(ref, <Button> Click me </Button>)}> Drag me </button>
     	<button ref={(ref) => connectors.create(ref, <Text text='text component' />)}> Drag me too </button>
	   </div>
    </div> </>
	)
}