import edit from '../../edit.module.css';
import { Element, useNode, useEditor } from '@craftjs/core';
import { useState, useEffect } from 'react';
import Column from './Column'
import { faPlus, faTint, faTrash, faClone, faAt, faLock, faPenNib, faFillDrip, faFont, faAlignLeft, faAlignCenter, faAlignRight, faIndent, faOutdent, faListUl, faListOl, faHighlighter, faCode } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ColumnContainer({background, children, padding = 0}) {

  const { connectors: {connect, drag}, hovered, selected, dragged, actions: {setProp} } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
    hovered: state.events.hovered
  }));

  const { query, actions } = useEditor((state, query) => ({
    }));

  const [editable, setEditable] = useState(false);
  useEffect(() => {!selected && setEditable(false)}, [selected]);

  const { ...collected } = useNode((collector) => {
    return collector
  });

  const addCol = (e) => {
    const parent = (collected.data.linkedNodes.ColContainer)
    const first = query.node(collected.data.linkedNodes.ColContainer).get()
    const node_to_make = {
      data: query.node(first.data.nodes[0]).get().data
    }

    const node = query.parseFreshNode(node_to_make).toNode();
    console.log(node)
    node.data.nodes = null;
    actions.add(node, parent);
  }
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

  return (
    <div className={edit.columnWrapper} ref={ref => connect(drag(ref))} onClick={e => setEditable(true)} >
     {selected? <div> 

      <div className={edit.columnsContainerOptions} >  
        <FontAwesomeIcon onClick={addCol} className={ edit.icon } icon={ faPlus } />
        <FontAwesomeIcon onClick={duplicate} className={ edit.icon } icon={ faClone } />
        <FontAwesomeIcon onClick={delete_node} className={ edit.icon } icon={ faTrash } /> 
      </div>
      <Element className={edit.columnContainer} id="ColContainer" canvas>
          <Element is={Column} id="Col1" canvas />
      </Element>
       </div> : 
      <Element className={edit.columnContainer} id="ColContainer" canvas>
          <Element is={Column} id="Col1" canvas />
      </Element>

      }
    </div>
  )
}

ColumnContainer.craft = {
  props: { 
    src: "https://wallpaperaccess.com/full/340597.jpg",
    height: "800px",
    width: "100vw"
  },
  related: {
  },
  displayName: "Column Container"

}