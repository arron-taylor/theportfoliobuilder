import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import edit from '../../edit.module.css';
import  Text  from "./Text";
import  {Button}  from "./Button";
import  Container  from "./Container";
import {useNode, Element} from "@craftjs/core";

export default function Card({background, padding = 20}) {

	const { connectors: {connect, drag}, hovered, selected, dragged, actions: {setProp} } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
    hovered: state.events.hovered
  }));
  const [editable, setEditable] = useState(false);
  useEffect(() => {!selected && setEditable(false)}, [selected]);

	return (
		<div onClick={e => setEditable(true)} ref={ref => connect(drag(ref))} className={edit.EditableText}>
    
    { selected? <div className={edit.textBorder}> 
      <div className={edit.Card}>
   <Container background={background} padding={padding} >
      <Element id="text" canvas> // Canvas Node of type div
        <Text text="Title"  />
        <Text text="Subtitle"/>
      </Element>
      <Element id="buttons" canvas> // Canvas Node of type div
        <Button text="Learn more" />
      </Element>
    </Container>
    </div>
    </div> : <div className={edit.Card}>
   <Container background={background} padding={padding} >
      <Element id="text" canvas> // Canvas Node of type div
        <Text text="Title"  />
        <Text text="Subtitle"/>
      </Element>
      <Element id="buttons" canvas> // Canvas Node of type div
        <Button text="Learn more" />
      </Element>
    </Container>
    </div>
		}
    
    </div>
		
	)
}