import edit from '../../edit.module.css';
import { Element } from '@craftjs/core';

export default function Container({background, children, padding = 50}) {
  return (
    <div style={{background, padding: `${padding}px`}} className={edit.EditableContainer}>
      <Element style={{background: 'rgba(0, 0, 0, 0.25)', "min-height": "200px"}} id='Container' canvas>
        {children}
     </Element>
    </div>
  )
}