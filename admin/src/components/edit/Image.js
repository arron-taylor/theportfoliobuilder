import React, {useCallback} from "react";
import ContentEditable from 'react-contenteditable'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import edit from '../../edit.module.css';
import { useNode, useEditor } from "@craftjs/core";
import settings from '../../settings.module.css';
import style from '../../styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt, faLock, faPenNib, faFillDrip, faFont, faAlignLeft, faAlignCenter, faAlignRight, faIndent, faOutdent, faListUl, faListOl, faHighlighter, faCode } from '@fortawesome/free-solid-svg-icons'

export default function Image({height, width, src, marginLeft, marginTop}) {

   
  const { connectors: {connect, drag}, hovered, selected, dragged, actions: {setProp} } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
    hovered: state.events.hovered
  }));
  const [editable, setEditable] = useState(false);
  useEffect(() => {!selected && setEditable(false)}, [selected]);

	return (
    <div onClick={e => setEditable(true)} ref={ref => connect(drag(ref))} className={edit.EditableText} style={{marginLeft, marginTop}}>
    
    { selected? <div className={edit.textBorder}> 
      <img src={src} style={{height, width}} />

         </div> : <img src={src} style={{height, width}}style={{height, width}}/>
		}
    
    </div>
	)
}

export const ImageSettings = () => {
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
            <td className={settings.label} id="src">
              URL
            </td>
          </tr>
          <tr>
            <td>
              <FontAwesomeIcon id="src_icon" className={ settings.icon } icon={ faPenNib } />
            </td>
            <td>
              <input onChange={handleField} value={props.src} onFocus={highLight} onBlur={dehighLight} type="text" name="src" placeholder="URL of image" /> 
            </td>
          </tr> 
          <tr>
            <td className={settings.label} id="marginLeft">
              MarginLeft
            </td>
          </tr>
          <tr>
            <td style={{display: "flex", height: "51px","align-items": "center"}}>
              <FontAwesomeIcon id="marginLeft_icon" className={ settings.icon_tiny } icon={ faFont } />
            </td>
            <td>
              <input onChange={handleField} value={props.marginLeft} onFocus={highLight} onBlur={dehighLight} type="text" name="marginLeft" placeholder="12px" /> 
            </td>
          </tr> 
          <tr>
            <td className={settings.label} id="marginTop">
              MarginTop
            </td>
          </tr>
          <tr>
            <td style={{display: "flex", height: "51px","align-items": "center"}}>
              <FontAwesomeIcon id="marginTop_icon" className={ settings.icon_tiny } icon={ faFont } />
            </td>
            <td>
              <input onChange={handleField} value={props.marginTop} onFocus={highLight} onBlur={dehighLight} type="text" name="marginTop" placeholder="12px" /> 
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
            <td className={settings.label} id="height">
              Height
            </td>
          </tr>
          <tr>
            <td style={{display: "flex", height: "51px","align-items": "center"}}>
              <FontAwesomeIcon id="height_icon" className={ settings.icon_tiny } icon={ faFont } />
              <FontAwesomeIcon id="size_icon" className={ settings.icon } icon={ faFont } />
            </td>
            <td>
              <input onChange={handleField} value={props.height} onFocus={highLight} onBlur={dehighLight} type="text" name="height" placeholder="12px" /> 
            </td>
          </tr> 
          <tr>
            <td className={settings.label} id="width">
              Width
            </td>
          </tr>
          <tr>
            <td style={{display: "flex", height: "51px","align-items": "center"}}>
              <FontAwesomeIcon id="width_icon" className={ settings.icon_tiny } icon={ faFont } />
              <FontAwesomeIcon id="size_icon" className={ settings.icon } icon={ faFont } />
            </td>
            <td>
              <input onChange={handleField} value={props.width} onFocus={highLight} onBlur={dehighLight} type="text" name="width" placeholder="12px" /> 
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
Image.craft = {
  props: { 
    height: "100px",
    width: "100px",
    marginLeft: "0px", 
    marginTop: "0px",
    src: "https://res.cloudinary.com/css-tricks/image/fetch/w_600,q_auto,f_auto/https://cdn4.buysellads.net/uu/7/78180/1608680187-MCSmart_Engage_Custom_Feature_SmartRecs_GetStarted_1x1-_1_.jpg"
  },
  related: {
    settings: ImageSettings
  }
}