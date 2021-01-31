import { useState} from 'react';
import edit from '../../edit.module.css';
import { useEditor, useNode } from "@craftjs/core";
import { Button } from './Button'
import  Text  from './Text'
import  Card  from './Card'
import  NavBar  from './NavBar'
import  NavItem  from './NavItem'
import  ColumnContainer  from './ColumnContainer'
import  Column  from './Column'
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
    if (e.target.innerHTML == ' Card Component ') {
        var element = document.createElement('div');   // Create a <button> element
        element.innerHTML = e.target.innerHTML;                   // Insert text
        element.style.position = 'absolute';
        element.style.height = '200px'
        element.style.width = '100px'
        element.style.border = '1px solid #333'
        element.style.padding = "10px"
        element.style.borderRadius = "10px"
    }
    else if (e.target.innerHTML == ' Navbar ') {
       var element = document.createElement('div');   // Create a <button> element
        element.innerHTML = e.target.innerHTML;                   // Insert text
        element.style.position = 'absolute';
        element.style.height = '50px'
        element.style.width = '250px'
        element.style.border = '1px solid #333'
        element.style.background = "rgba(0, 0, 0, 0.75)"
        element.style.color = "#fefefe"
        element.style.borderRadius = "10px"
        element.style.padding = "10px"
        console.log("NAVBAR")
    } 
    else if (e.target.innerHTML == ' Bar Item ') {
        var element = document.createElement('div');   // Create a <button> element
        element.innerHTML = e.target.innerHTML;                   // Insert text
        element.style.position = 'absolute';
        element.style.height = '50px'
        element.style.width = '100px'
        element.style.border = '1px solid #ccc'
        element.style.background = "rgba(250, 250, 250, 0.75)"
        element.style.color = "#333"
        element.style.borderRadius = "10px"
        element.style.padding = "10px"
    }
    else {
        var element = document.createElement(e.target.name);   // Create a <button> element
        element.innerHTML = "Component";                   // Insert text
        element.style.position = 'absolute';
    }
    element.style.zIndex = '25';
    document.getElementById("root").appendChild(element);               // Append <button> to <body>
    setDragging(element);
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
        <div ref={(ref) => connectors.create(ref, <ColumnContainer />)}> Container </div>
     	<button name="button" onDragStart={duplicate} onDrag={moveItem} onDragEnd={ clear } ref={(ref) => connectors.create(ref, <Button> Button Component </Button>)}> Button Component </button>
     	<div name="span" onDragStart={duplicate} onDrag={moveItem} onDragEnd={ clear } ref={(ref) => connectors.create(ref, <Text text='text component' />)}> Text Component </div>
     	<div onDragStart={duplicate} onDrag={moveItem} onDragEnd={ clear } ref={(ref) => connectors.create(ref, <Card text='text component' />)}> Card Component </div>
     	<div onDragStart={duplicate} onDrag={moveItem} onDragEnd={ clear } ref={(ref) => connectors.create(ref, <NavBar text='Navbar Component' />)}> Navbar </div>
     	<div onDragStart={duplicate} onDrag={moveItem} onDragEnd={ clear } ref={(ref) => connectors.create(ref, <NavItem text='New Item' />)}> Bar Item </div>
     	<div ref={(ref) => connectors.create(ref, <Hero />)}> Hero Component </div>
     	<div ref={(ref) => connectors.create(ref, <Image />)}> Image Component </div>
        <div ref={(ref) => connectors.create(ref, <Column />)}> Column Component </div>
    </div>
	)
}