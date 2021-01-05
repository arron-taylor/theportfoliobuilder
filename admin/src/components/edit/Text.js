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

export default function Text({text, fontSize, textAlign}) {
  const { connectors: {connect, drag}, selected, dragged, actions: {setProp} } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged
  }));

  const [editable, setEditable] = useState(false);
  useEffect(() => {!selected && setEditable(false)}, [selected]);

	return (
    <div onClick={e => setEditable(true)} ref={ref => connect(drag(ref))} className={edit.EditableText}>
		  <ContentEditable
        disabled={!editable}
        html={text} 
        onChange={e => 
          setProp(props => 
            props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, "")  
          )
        } 
        tagName="p"
        style={{fontSize: `${fontSize}px`, textAlign}}
      />
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

  const [focused, setFocus] = useState({email:false, password:false});

  const handleField = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({ ...prevState,[name]: value}));
  }
  const highLight = (e) => {
    const { name, value } = e.target;
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
            <td className={settings.label} id="email">
              Font
            </td>
          </tr>
          <tr>
            <td>
              <FontAwesomeIcon id="email_icon" className={ settings.icon } icon={ faPenNib } />
            </td>
            <td>
              <input onChange={handleField} value={user.email} onFocus={highLight} onBlur={dehighLight} type="text" name="email" placeholder="Font-Family" /> 
            </td>
          </tr> 
          <tr>
            <td className={settings.label} id="password">
              Color
            </td>
          </tr>
          <tr>
            <td>
              <FontAwesomeIcon id="password_icon" className={ settings.icon } icon={ faFillDrip } />
            </td>
            <td>
              <input onChange={handleField} value={user.password} onFocus={highLight} onBlur={dehighLight} type="password" name="password" placeholder="#FFFFFF" /> <br />
            </td>
          </tr>
          <tr>
            <td className={settings.label} id="email">
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
            <td className={settings.label} id="email">
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
            <td className={settings.label} id="email">
              Size
            </td>
          </tr>
          <tr>
            <td style={{display: "flex", height: "51px","align-items": "center"}}>
              <FontAwesomeIcon id="email_icon" className={ settings.icon_tiny } icon={ faFont } />
              <FontAwesomeIcon id="email_icon" className={ settings.icon } icon={ faFont } />
            </td>
            <td>
              <input onChange={handleField} value={user.email} onFocus={highLight} onBlur={dehighLight} type="text" name="email" placeholder="12px" /> 
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
    size: "small", 
    variant: "contained",
    color: "primary",
    text: "Click me"
  },
  related: {
    settings: TextSettings
  }
}