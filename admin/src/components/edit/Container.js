import edit from '../../edit.module.css';
import { Element, useNode } from '@craftjs/core';
import { useState, useEffect } from 'react';

export default function Container({background, children, padding = 0}) {

  const { connectors: {connect, drag}, hovered, selected, dragged, actions: {setProp} } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
    hovered: state.events.hovered
  }));
  const [editable, setEditable] = useState(false);
  useEffect(() => {!selected && setEditable(false)}, [selected]);

  return (
    <div ref={ref => connect(drag(ref))} className={edit.EditableContainer}>
        {children}
    </div>
  )
}