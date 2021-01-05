import React, {useCallback} from "react";
import ContentEditable from 'react-contenteditable'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import edit from '../../edit.module.css';
import { useNode } from "@craftjs/core";
import settings from '../../settings.module.css';
import style from '../../styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt, faLock, faPenNib, faFillDrip, faFont, faAlignLeft, faAlignCenter, faAlignRight, faIndent, faOutdent, faListUl, faListOl, faHighlighter, faCode } from '@fortawesome/free-solid-svg-icons'

export default function Text({text, fontSize, textAlign, color, fontFamily}) {
  const { connectors: {connect, drag}, selected, dragged, actions: {setProp} } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged
  }));

  const [editable, setEditable] = useState(false);
  useEffect(() => {!selected && setEditable(false)}, [selected]);

	return (
    <div onClick={e => setEditable(true)} ref={ref => connect(drag(ref))} className={edit.EditableText}>
    { selected? <div className={edit.textBorder}> 
      <ContentEditable disabled={!editable} html={text} 
        onChange={e => 
          setProp(props => 
            props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, "")  
          )
        } 
        tagName="p"
        style={{fontSize: `${fontSize}px`, textAlign, color, fontFamily}}/> </div> : <p style={{fontSize: `${fontSize}px`, textAlign, color, fontFamily}}>{text}</p>
		}
    </div>
	)
}

export const TextSettings = () => {
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
            <td className={settings.label} id="">
              Align
            </td>
          </tr>
          <tr>
            
            <td className={settings.editButtons}>
              <FontAwesomeIcon id="password_icon" className={ settings.iconbutton } icon={ faAlignLeft } />
              <FontAwesomeIcon id="password_icon" className={ settings.iconbutton } icon={ faAlignCenter } />
              <FontAwesomeIcon id="password_icon" className={ settings.iconbutton } icon={ faAlignRight } />
            </td>
          </tr> 
          <tr>
            <td className={settings.label} id="">
              List
            </td>
          </tr>
          <tr>
            <td className={settings.editButtonsSmall}>
              <FontAwesomeIcon id="password_icon" className={ settings.iconbutton } icon={ faListUl } />
              <FontAwesomeIcon id="password_icon" className={ settings.iconbutton } icon={ faListOl } />
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
              <input onChange={handleField} value={props.fontSize} onFocus={highLight} onBlur={dehighLight} type="text" name="fontSize" placeholder="12px" /> 
            </td>
          </tr> 
          <tr>
            <td className={settings.label} id="password">
             Icons
            </td>
          </tr>
          <tr>
            <td>
              <FontAwesomeIcon id="password_icon" className={ settings.icon } icon={ faLock } />
            </td>
            <td>
              <input onChange={handleField} value={user.password} onFocus={highLight} onBlur={dehighLight} type="password" name="password" placeholder="password" /> <br />
            </td>
          </tr>
          <tr>
            <td className={settings.label} id="password">
              Indent
            </td>
          </tr>
          <tr>
            <td className={settings.editButtonsSmall}>
              <FontAwesomeIcon id="password_icon" className={ settings.iconbutton } icon={ faIndent } />
              <FontAwesomeIcon id="password_icon" className={ settings.iconbutton } icon={ faOutdent } />
            </td>
          </tr>
          <tr>
            <td className={settings.label} id="password">
              Style
            </td>
          </tr>
          <tr>
            <td className={settings.editButtonsSmall}>
              <FontAwesomeIcon id="password_icon" className={ settings.iconbutton } icon={ faCode } />
              <FontAwesomeIcon id="password_icon" className={ settings.iconbutton } icon={ faHighlighter } />
            </td>
          </tr>
        </table>
    </div>
  )
}

Text.craft = {
  props: { 
    fontSize: "12",
    fontFamily: 'comic sans ms',
    text: "Click me",
    color: "#333333"
  },
  related: {
    settings: TextSettings
  }
}