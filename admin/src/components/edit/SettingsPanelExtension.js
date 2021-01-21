import React from 'react';
import edit from '../../edit.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useEditor, useNode } from "@craftjs/core";

export default function SettingsPanelExtension(props) {
  const setNull = () => {
    actions.selectNode(null)
  }
  const { ...collected } = useNode((collector) => {
    return collector
  });
  
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

	return props.extension? ( 

		<div className={edit.SettingsPanelExtension}>
     <div className={edit.header}> 
     	<h1 className={edit.title}>  {collected.data.props.settingsExtensionName} </h1> <FontAwesomeIcon onClick={props.toggle} className={edit.x} icon={faTimes} />
     </div>
     <div className={edit.body}> 
     { collected.data.props.settingsExtension && React.createElement(collected.data.props.settingsExtension) }
     </div>
    </div>  
	) : null
}