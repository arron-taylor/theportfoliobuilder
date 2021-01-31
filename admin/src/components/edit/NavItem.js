import React from "react";
import { useState, useEffect } from 'react';
import edit from '../../edit.module.css';
import { useNode } from "@craftjs/core";
import  Text  from "./Text";

import settings from '../../settings.module.css';
import style from '../../styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenNib, faFont, faFillDrip, faLock } from '@fortawesome/free-solid-svg-icons'

export default function NavItem({text, fontSize, textAlign, color, fontFamily, backgroundColor}) {

  const { connectors: {connect, drag}, selected, dragged, actions: {setProp} } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
  }));

  const { ...collected } = useNode((collector) => {
    return collector
  });
  
  const duplicate = (e) => {
    console.log(collected);
  }

	return (
  <>{  selected? 
      <div ref={ref => connect(drag(ref))} className={edit.EditableText}>
      <div style={{backgroundColor, color}} className={edit.navitem}> 
        <Text fontSize={fontSize} fontFamily={fontFamily} text={text} />
      
      </div>
    </div> : 
    <div ref={ref => connect(drag(ref))} className={edit.EditableText}>
      <div onClick={duplicate} style={{backgroundColor, color}} className={edit.navitem}> 
        <Text fontSize={fontSize} fontFamily={fontFamily} text={text} />
      
      </div>
    </div>
    }
    
  </>	)
}

export const NavItemSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  const [user, setUser] = useState({name: '', email: '', isLoggedIn: false});
  const [focused, setFocus] = useState({});

  const handleField = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({ ...prevState,[name]: value}));
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
              <input className={ settings.text }  onChange={handleField} value={props.fontFamily} onFocus={highLight} onBlur={dehighLight} type="text" name="fontFamily" placeholder="Font-Family" /> 
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
              <input className={ settings.text }  onChange={handleField} value={props.color} onFocus={highLight} onBlur={dehighLight} type="text" name="color" placeholder="#FFFFFF" /> <br />
            </td>
          </tr>
          
        </table>


        <table className={settings.right}>
          <tr>
            <td className={settings.label} id="fontSize">
              Size
            </td>
          </tr>
          <tr>
            <td style={{display: "flex", height: "51px","align-items": "center"}}>
              <FontAwesomeIcon id="fontSize_icon" className={ settings.icon_tiny } icon={ faFont } />
              <FontAwesomeIcon id="size_icon" className={ settings.icon } icon={ faFont } />
            </td>
            <td>
              <input className={ settings.text }  onChange={handleField} value={props.fontSize} onFocus={highLight} onBlur={dehighLight} type="text" name="fontSize" placeholder="12px" /> 
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
              <input className={ settings.text }  onChange={handleField} value={props.backgroundColor} onFocus={highLight} onBlur={dehighLight} type="text" name="backgroundColor" placeholder="password" /> <br />
            </td>
          </tr>
          
        </table>
    </div>
  )
}

NavItem.craft = {
  props: { 
    fontSize: "12",
    fontFamily: 'comic sans ms',
    text: "Click me",
    color: "#333333",
    backgroundColor: "#fefefe",
  },
  related: {
    settings: NavItemSettings
  }

}