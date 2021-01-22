import { useState, useEffect } from 'react';
import ContentEditable from 'react-contenteditable'
import { Link } from 'react-router-dom'
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import edit from '../../edit.module.css';
import { useNode, useEditor } from "@craftjs/core";
import { faClone, faTrash, faAt, faLock, faPenNib, faFillDrip, faFont, faAlignLeft, faAlignCenter, faAlignRight, faIndent, faOutdent, faListUl, faListOl, faHighlighter, faCode } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import settings from '../../settings.module.css';

export const Button = ({size, children, text, fontSize, textAlign, color, fontFamily, backgroundColor, borderRadius,  border}) => {

  const { connectors: {connect, drag}, selected, dragged, actions: {setProp} } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged
  }));
  const [editable, setEditable] = useState(false);

   const { query, actions } = useEditor((state, query) => ({
    }));
  
  const { ...collected } = useNode((collector) => {
    return collector
  });
  const duplicate = (e) => {
    const parent = (collected.data.parent)
    const node_to_make = {
      data: collected.data
    }
    console.log(node_to_make)
    const node = query.parseFreshNode(node_to_make).toNode();
    actions.add(node, parent);
  }
  const delete_node = () => {
    actions.delete(collected.id)
  }

	return (
		<div onClick={e => setEditable(true)} ref={ref => connect(drag(ref))} className={edit.EditableText}>
    { selected? <button className={edit.textBorder}> 
    <div className={edit.options} >  
      <FontAwesomeIcon onClick={duplicate} id="color_icon" className={ edit.icon } icon={ faClone } />
      <FontAwesomeIcon onClick={delete_node} id="color_icon" className={ edit.icon } icon={ faTrash } /> 
    </div>
      <ContentEditable disabled={!editable} html={text} 
        onChange={e => 
          setProp(props => 
            props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, "")  
          )
        } 
        tagName="button"
        style={{fontSize: `${fontSize}px`, textAlign, color, fontFamily, backgroundColor, borderRadius, border}}/> </button> : 
        <button style={{fontSize: `${fontSize}px`, textAlign, color, fontFamily, backgroundColor, borderRadius, border}}>{text}</button>
    }
    </div>
	)
}

export const ButtonSettings = () => {
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
              <input className={ settings.text }  onChange={handleField} value={props.border} onFocus={highLight} onBlur={dehighLight} type="text" name="border" placeholder="#FFFFFF" /> <br />
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
              <input className={ settings.text }  onChange={handleField} value={props.borderRadius} onFocus={highLight} onBlur={dehighLight} type="text" name="borderRadius" placeholder="#FFFFFF" /> <br />
            </td>
          </tr>
        </table>
    </div>
  )
}

Button.craft = {
  props: { 
    color: "#333",
    text: "Click me",
    fontFamily: "Arial", 
    backgroundColor: "#FEFEFE",
    borderRadius: "5px",
    border: "2px solid #eee"
  },
  related: {
    settings: ButtonSettings
  }
}

