import React from 'react';
import edit from '../../edit.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useEditor } from "@craftjs/core";

export default function SettingsPanel(props) {
  const setNull = () => {
    actions.selectNode(null)
  }
  const { actions, selected, query } = useEditor((state, query) => {
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
    <> { query.node(selected.id).get().related.resizer? 
     React.createElement(query.node(selected.id).get().related.resizer) :  null }
		<div id="SettingsPanel" className={edit.SettingsPanel}>
     <div className={edit.header}> 
     	<h1 className={edit.title}> { selected.name } </h1> <FontAwesomeIcon onClick={setNull} className={edit.x} icon={faTimes} />
     </div>
     <div className={edit.body}> 
     {	selected.settings && React.createElement(selected.settings, {delete: () => { actions.delete(selected.id)}})  }
	   </div>
	   {/*
          selected.isDeletable ? (
            <button style={{width: "50px", margin: "0px auto", }}
              onClick={() => {
                actions.delete(selected.id);
              }}
            >
              Delete
            </button>
          ) : null
        */}
    </div>  </>
	) : null
}