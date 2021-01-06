import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import edit from '../../edit.module.css';
import  NavItem  from "./NavItem";
import  {Button}  from "./Button";
import  Container  from "./Container";
import {useNode, Element} from "@craftjs/core";
import { faAt, faLock, faPenNib, faFillDrip, faFont, faAlignLeft, faAlignCenter, faAlignRight, faIndent, faOutdent, faListUl, faListOl, faHighlighter, faCode } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import settings from '../../settings.module.css';

export default function NavBar({backgroundColor, height}) {

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
  <div style={{backgroundColor, height}} className={edit.NavBar}>
      <Element id="somethin" canvas> // Canvas Node of type div
        <NavItem className={edit.navitem} text="Item"  />
        <NavItem className={edit.navitem} text="Second Item"/>
      </Element>
    </div>
    </div> : 

  <div style={{backgroundColor, height}} className={edit.NavBar}>
      <Element id="somethin" canvas> // Canvas Node of type div
        <NavItem text="Item">
        </NavItem>
        <NavItem text="Second Item"/>
      </Element>
    </div>
		}
    
    </div>
		
	)
}

export const NavBarSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  const [focused, setFocus] = useState({});

  const handleField = (e) => {
    const { name, value } = e.target;
    setProp(props => { 
      props[name] = e.target.value.replace(/<\/?[^>]+(>|$)/g, "")  
    });
  }

   useEffect( () => {
    Object.keys(focused).map(
      (i, key) => {
        if(focused[i] === true) {
          let element = document.getElementById(i);
          let element_icon = document.getElementById(i + '_icon');
          element.style.color = "#7165E3";
          element.style.fontWeight = 'bold';
          element_icon.style.color = "#7165E3";
        }
        else {
          let element_icon = document.getElementById(i + '_icon');
          let element = document.getElementById(i);
          element.style.color = "#989898";
          element.style.fontWeight = 'normal';
          element_icon.style.color = "#DBDBDB";
        }
      }
    )

  });
  const highLight = (e) => {
    const { name, value } = e.target;
    console.log(name, value)
    setFocus(prevState => ({ ...prevState, [name]:true }));
  }
  const dehighLight = (e) => {
    const { name, value } = e.target;
    setFocus(prevState => ({ ...prevState, [name]:false }));
  }

  return ( 
    <div className={settings.container}>
     <table className={settings.left}>
          <tr>
            <td className={settings.label} id="fontFamily">
              Font
            </td>
          </tr>
          <tr>
            <td>
              <FontAwesomeIcon id="fontFamily_icon" className={ settings.icon } icon={ faPenNib } />
            </td>
            <td>
              <input onChange={handleField} value={props.fontFamily} onFocus={highLight} onBlur={dehighLight} type="text" name="fontFamily" placeholder="Font-Family" /> 
            </td>
          </tr> 
          <tr>
            <td className={settings.label} id="color">
              Color
            </td>
          </tr>
          <tr>
            <td>
              <FontAwesomeIcon id="color_icon" className={ settings.icon } icon={ faFillDrip } />
            </td>
            <td>
              <input onChange={handleField} value={props.color} onFocus={highLight} onBlur={dehighLight} type="text" name="color" placeholder="#FFFFFF" /> <br />
            </td>
          </tr>
          <tr>
            <td className={settings.label} id="border">
              Border
            </td>
          </tr>
          <tr>
            <td>
              <FontAwesomeIcon id="border_icon" className={ settings.icon } icon={ faFillDrip } />
            </td>
            <td>
              <input onChange={handleField} value={props.border} onFocus={highLight} onBlur={dehighLight} type="text" name="border" placeholder="#FFFFFF" /> <br />
            </td>
          </tr>
          
        </table>


        <table className={settings.right}>
          <tr>
            <td className={settings.label} id="height">
              Height
            </td>
          </tr>
          <tr>
            <td style={{display: "flex", height: "51px","align-items": "center"}}>
              <FontAwesomeIcon id="height_icon" className={ settings.icon } icon={ faFont } />
            </td>
            <td>
              <input onChange={handleField} value={props.height} onFocus={highLight} onBlur={dehighLight} type="text" name="height" placeholder="12px" /> 
            </td>
          </tr> 
          <tr>
            <td className={settings.label} id="backgroundColor">
            BG Color
            </td>
          </tr>
          <tr>
            <td>
              <FontAwesomeIcon id="backgroundColor_icon" className={ settings.icon } icon={ faLock } />
            </td>
            <td>
              <input onChange={handleField} value={props.backgroundColor} onFocus={highLight} onBlur={dehighLight} type="text" name="backgroundColor" placeholder="password" /> <br />
            </td>
          </tr>
          <tr>
            <td className={settings.label} id="borderRadius">
             Radius
            </td>
          </tr>
          <tr>
            <td>
              <FontAwesomeIcon id="borderRadius_icon" className={ settings.icon } icon={ faFillDrip } />
            </td>
            <td>
              <input onChange={handleField} value={props.borderRadius} onFocus={highLight} onBlur={dehighLight} type="text" name="borderRadius" placeholder="#FFFFFF" /> <br />
            </td>
          </tr>
        </table>
    </div>
  )
}


NavBar.craft = {
  props: { 
    height: "100px",
    backgroundColor: "purple"
  },
  related: {
    settings: NavBarSettings
    }
}
