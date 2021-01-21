import { useState} from 'react';
import { Link } from 'react-router-dom'
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import edit from '../../edit.module.css';
import { useEditor, useNode } from "@craftjs/core";
import { Button } from './Button'
import  Text  from './Text'
import  Card  from './Card'
import  NavBar  from './NavBar'
import  NavItem  from './NavItem'
import  Container  from './Container'
import  Hero  from './Hero'
import  Image  from './Image'

export const Toolbox = () => {

const [dragging, setDragging] = useState();

const { query, actions } = useEditor((state, query) => ({
    }));
  
  const { ...collected } = useNode((collector) => {
    return collector
  }); 

  const duplicate = (e) => {
//    console.log(collected, e.target.name)
console.log(e.target.name)
    var btn = document.createElement(e.target.name);   // Create a <button> element
    btn.innerHTML = "Component";                   // Insert text
    btn.style.position = 'absolute';
    btn.style.zIndex = '25';
    document.getElementById("root").appendChild(btn);               // Append <button> to <body>
    setDragging(btn);
  }
  const moveItem = (e) => {
    if(dragging) {
        dragging.style.top = window.scrollY + e.clientY + "px"
        dragging.style.left = window.scrollX + e.clientX  + "px"
    }
  }
  const clear = () => {
   if(dragging) {
        document.getElementById("root").removeChild(dragging) 
    }
  }

  const { connectors } = useEditor();
	return (
		<div className={edit.Toolbox}>
     	<button name="button" onDragStart={duplicate} onDrag={moveItem} onDragEnd={ clear } ref={(ref) => connectors.create(ref, <Button> Button Component </Button>)}> Button Component </button>
     	<div name="span" onDragStart={duplicate} onDrag={moveItem} onDragEnd={ clear } ref={(ref) => connectors.create(ref, <Text text='text component' />)}> Text Component </div>
     	<div ref={(ref) => connectors.create(ref, <Card text='text component' />)}> Card Component </div>
     	<div ref={(ref) => connectors.create(ref, <NavBar text='Navbar Component' />)}> Navbar Component </div>
     	<div ref={(ref) => connectors.create(ref, <NavItem text='New Item' />)}> Navbar Item </div>
     	<div ref={(ref) => connectors.create(ref, <Container />)}> New Container </div>
     	<div ref={(ref) => connectors.create(ref, <Hero />)}> Hero Component </div>
     	<div ref={(ref) => connectors.create(ref, <Image />)}> Image Component </div>
    </div>
	)
}