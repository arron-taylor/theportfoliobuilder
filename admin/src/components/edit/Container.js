import edit from '../../edit.module.css';
import { Element, useNode } from '@craftjs/core';
import { useState, useEffect } from 'react';

export default function Container({background, children, padding = 250}) {

  const { connectors: {connect, drag}, hovered, selected, dragged, actions: {setProp} } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
    hovered: state.events.hovered
  }));
  const [editable, setEditable] = useState(false);
  useEffect(() => {!selected && setEditable(false)}, [selected]);

  return (
    <div ref={ref => connect(drag(ref))} style={{background, "display": "block"}} className={edit.EditableContainer}>
      <Element style={{background: 'rgba(0, 0, 0, 0.25)', "min-height": "200px", padding: `${padding}px`}} id='Container' canvas>
        {children}
     </Element>
    </div>
  )
}