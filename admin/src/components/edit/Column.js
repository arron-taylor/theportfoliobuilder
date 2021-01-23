import edit from '../../edit.module.css';
import { Element, useNode, useEditor } from '@craftjs/core';
import { useState, useEffect } from 'react';
import { faPlus, faTint, faTrash, faClone, faAt, faLock, faPenNib, faFillDrip, faFont, faAlignLeft, faAlignCenter, faAlignRight, faIndent, faOutdent, faListUl, faListOl, faHighlighter, faCode } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Column({children, padding = 0}) {

  const { connectors: {connect, drag}, hovered, selected, dragged, actions: {setProp} } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
    hovered: state.events.hovered
  }));

  const { query, actions } = useEditor((state, query) => ({
    }));

  const { ...collected } = useNode((collector) => {
    return collector
  });
  const duplicate = (e) => {
    const parent = (collected.data.parent)
    const node_to_make = {
      data: collected.data
    }
    const node = query.parseFreshNode(node_to_make).toNode();
    actions.add(node, parent);
  }

  const delete_node = () => {
    actions.delete(collected.id)
  }
  const [editable, setEditable] = useState(false);
  useEffect(() => {!selected && setEditable(false)}, [selected]);

  return ( 

    <div className={edit.columnDroppable} ref={ref => connect(drag(ref))} >
    {selected? 
      <> <div className={edit.columnOptions} >  
        <FontAwesomeIcon onClick={duplicate} className={ edit.icon } icon={ faPlus } />
        <FontAwesomeIcon onClick={duplicate} className={ edit.icon } icon={ faClone } />
        <FontAwesomeIcon onClick={delete_node} className={ edit.icon } icon={ faTrash } /> 
      </div>
      <div className={edit.columnContent}>
       {children} 
      </div>
       </> : 
      <div className={edit.columnContent}> {children}</div>
      
    }
    </div>
  )
}

Column.craft = {
  props: { 
    height: "800px",
    width: "100vw"
  },
  related: {
  },
  displayName: "Column Container"

}