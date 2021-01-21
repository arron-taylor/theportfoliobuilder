import { useState, useEffect } from 'react';
import edit from '../../edit.module.css';
import  NavItem  from "./NavItem";
import {useNode, Element} from "@craftjs/core";
import { faLock, faPenNib, faFillDrip, faFont, } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import settings from '../../settings.module.css';

export default function NavBar({backgroundColor, height, boxShadow}) {

	const { connectors: {connect, drag}, selected, dragged, actions: {setProp} } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
  }));

  let draggedover = false;

  const [editable, setEditable] = useState(false);
  useEffect(() => {!selected && setEditable(false)}, [selected]);
  
	return (

		<div onClick={e => setEditable(true)} ref={ref => connect(drag(ref))} >
    { selected? 
      <div style={{backgroundColor, height, boxShadow}} className={edit.NavBar}>
          <Element className={edit.start} id="somethin" canvas>
            <NavItem className={edit.navitem} text="Company Logo"  />
          </Element>
          <Element className={edit.middle} id="somethin1" canvas> 
            <NavItem className={edit.navitem} text="Item"  />
          </Element>
          <Element className={edit.end} id="somethin2"  canvas>
            <NavItem className={edit.navitem} text="Item"  />
          </Element>
        </div>
         : 

      <div style={{backgroundColor, height, boxShadow}} className={edit.NavBar}>
          <Element className={edit.start} onMouseOut={() => draggedover = false} id="somethin" canvas> 
            <NavItem text="Company Logo" />
          </Element>
        <Element className={edit.middle} id="somethin1" canvas>
            <NavItem className={edit.navitem} text="Item"  />
          </Element>
          <Element className={edit.end} id="somethin2" canvas> 
            <NavItem className={edit.navitem} text="Item"  />
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
    const { name } = e.target;
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
    backgroundColor: "#453D91",
    boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.5)"
  },
  related: {
    settings: NavBarSettings
    }
}
