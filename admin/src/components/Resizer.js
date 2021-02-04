import { useState, useEffect } from 'react';
import edit from '../edit.module.css';
import axios from 'axios';
import lz from "lzutf8";
import copy from 'copy-to-clipboard';
import { useEditor } from "@craftjs/core";
import { faTrash, faFileUpload, faLongArrowAltRight, faLongArrowAltDown, faLink, faArrowsAltH, faArrowsAltV } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Resizer(props) {

 	const { selected, query, actions } = useEditor((state) => ({
    selected: state.events.selected
  }));

  const [dimensions, setDimensions] = useState({height: props.height, width: props.width});
  const [editing, setedit] = useState(false);

  let selectedNode  = query.node(selected).get();
  let selection = selected;
  console.log(selectedNode)
  const setboth = (e) => {
  	if(editing){ 
	  	setDimensions(prevState => ({ ...prevState,['height']: e.clientY }));
	  	setDimensions(prevState => ({ ...prevState,['width']: e.clientX }));
			props.change(dimensions);
			closeitems()
  	}
  }
  const setHeight = (e) => {
  	if(editing) { 
	  	setDimensions(prevState => ({ ...prevState,['height']: e.clientY }));
			props.change(dimensions);
			closeitems()
  	}
  }
  const setWidth = (e) => {
  	if(editing) { 
	  	setDimensions(prevState => ({ ...prevState,['width']: e.clientX }));
			props.change(dimensions);
			closeitems()
  	}
  }
  const closeitems = () => {
  	document.getElementById('resizerboth').style.display = 'none'
  	document.getElementById('resizerwidth').style.display = 'none'
  	document.getElementById('resizerheight').style.display = 'none'

  }
  const openitems = () => {
  	let domLeft = selectedNode.dom.getBoundingClientRect().left;
	  	let domTop = selectedNode.dom.getBoundingClientRect().top;
			let resizerboth = document.getElementById('resizerboth')
	  	resizerboth.style.top = domTop  + props.height + 'px'
			resizerboth.style.left = domLeft + props.width + 'px'
	  	resizerboth.style.display = 'flex'

	  	let resizerheight = document.getElementById('resizerheight')
	  	resizerheight.style.top = domTop  + props.height + 'px'
			resizerheight.style.left = domLeft + (props.width/2) + 'px'
	  	resizerheight.style.display = 'flex'

	  	let resizerwidth = document.getElementById('resizerwidth')
	  	resizerwidth.style.top = domTop  + (props.height/2) + 'px'
			resizerwidth.style.left = domLeft + props.width + 'px'
	  	resizerwidth.style.display = 'flex'
  }
  useEffect( () => {
  	if(selected) {
	  	let domLeft = selectedNode.dom.offsetLeft;
	  	let domTop = selectedNode.dom.offsetTop;
			let resizerboth = document.getElementById('resizerboth')
	  	resizerboth.style.top = domTop  + props.height + 'px'
			resizerboth.style.left = domLeft + props.width + 'px'
	  	resizerboth.style.display = 'flex'

	  	let resizerheight = document.getElementById('resizerheight')
	  	resizerheight.style.top = domTop  + props.height + 'px'
			resizerheight.style.left = domLeft + (props.width/2) + 'px'
	  	resizerheight.style.display = 'flex'

	  	let resizerwidth = document.getElementById('resizerwidth')
	  	resizerwidth.style.top = domTop  + (props.height/2) + 'px'
			resizerwidth.style.left = domLeft + props.width + 'px'
	  	resizerwidth.style.display = 'flex'
  	} 
  	else {
				let resizerboth = document.getElementById('resizerboth')
	  		resizerboth.style.display = 'none'
	  	}
	  }, []
 );

		return (
			<>
				<div onDragStart={()=> setedit(true)} onDrag={setboth} onDragEnd={ () => { setedit(false); openitems() }}  id="resizerboth" className={edit.Resizer} draggable='true'>
	       <FontAwesomeIcon className={ edit.icon } icon={ faArrowsAltV } />
	      </div> 
	      <div onDragStart={()=> setedit(true)} onDrag={setHeight} onDragEnd={ () => { setedit(false); openitems() }}  id="resizerheight" className={edit.ResizerHeight} draggable='true'>
	       <FontAwesomeIcon className={ edit.icon } icon={ faArrowsAltV } />
	      </div> 
	      <div onDragStart={()=> setedit(true)} onDrag={setWidth} onDragEnd={ () => { setedit(false); openitems() } }  id="resizerwidth" className={edit.ResizerWidth} draggable='true'>
	       <FontAwesomeIcon className={ edit.icon } icon={ faArrowsAltV } />
	      </div> 
			</>
	)
}