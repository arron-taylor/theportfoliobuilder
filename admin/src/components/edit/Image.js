import React  from "react";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import edit from '../../edit.module.css';
import { useNode, useEditor } from "@craftjs/core";
import settings from '../../settings.module.css';
import SettingsPanelExtension from './SettingsPanelExtension'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClone, faTrash, faFileUpload, faLongArrowAltRight, faLongArrowAltDown, faLink, faArrowsAltH, faArrowsAltV } from '@fortawesome/free-solid-svg-icons'
import  Resizer  from '../../components/Resizer'

export default function Image({height, width, src, marginLeft, marginTop}) {

   
  const { connectors: {connect, drag}, hovered, selected, dragged, actions: {setProp} } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
    hovered: state.events.hovered
  }));
  const { query, actions } = useEditor((state, query) => ({
    }));

  const { ...collected } = useNode((collector) => {
    return collector
  });
  const delete_node = () => {
    actions.delete(collected.id)
  }
  const duplicate = (e) => {
    const parent = (collected.data.parent)
    const node_to_make = {
      data: collected.data
    }
    const node = query.parseFreshNode(node_to_make).toNode();
    actions.add(node, parent);
  }
	return (
    <div ref={ref => connect(drag(ref))} className={edit.EditableText} style={{marginLeft, marginTop}}>
    
    { selected? <div className={edit.textBorder}> 
    <div className={edit.options} >  
      <FontAwesomeIcon onClick={duplicate} className={ edit.icon } icon={ faClone } />
      <FontAwesomeIcon onClick={delete_node} className={ edit.icon } icon={ faTrash } /> 
    </div>
      <img src={src} style={{height: `${height}px`, width: `${width}px`}} />

         </div> : <img src={src} style={{height: `${height}px`, width: `${width}px`}} />
		}
    
    </div>
	)
}
export const ImageResizer = ({height, width}) => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props,
  }));
  return (
    <Resizer change={(e) => setProp(props => { props['width'] = e.width; props['height'] = e.height })} height={props.height} width={props.width} />
  )
}
export const ImageSettings = ({ src }) => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  const [extension, toggleExtenion] = useState(false);
  const [focused, setFocus] = useState({});
  const [slider, toggleSlider] = useState();

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
          let element_px = document.getElementById(i + '_px');
          element.style.color = "#7165E3";
          element.style.fontWeight = 'bold';
          element_icon.style.color = "#7165E3";
          element_px.style.color = "#fefefe";
          element_px.style.fontWeight = "bold";
          element_px.style.background = "#7165E3";
        }
        else {
          let element_icon = document.getElementById(i + '_icon');
          let element_px = document.getElementById(i + '_px');
          let element = document.getElementById(i);
          element.style.color = "#989898";
          element.style.fontWeight = 'normal';
          element_px.style.fontWeight = 'normal';
          element_icon.style.color = "#DBDBDB";
          element_px.style.background = "transparent";
          element_px.style.color = "#989898";
        }
      }
    )

  });
  const openSlider = (e) => {
    if(e) {
       const element = e.target.id.substring(0, e.target.id.length-5) + '_slider'
       if(document.getElementById(element)) {
         toggleSlider(element);
         setTimeout(() => {
            document.getElementById(element).style.display = 'flex'
         }, 250);
       }
    }
  }
  const clearSlider = () => {
    if(slider) {
      toggleSlider(null);
      document.getElementById(slider).style.display = 'none'
    }
  }
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
    <div >
    <table className={settings.sourcetable}>
     <tr>
        <td className={settings.label}>
          Source:
        </td>
      </tr>
      <tr>
        <td>
          <SettingsPanelExtension toggle={ e => toggleExtenion(false) } extension={extension} />
          <button style={{background: "url(" + props.src +  ")", backgroundSize: "cover"}} onClick={ e => toggleExtenion(true) } value={props.src} type="text" className="settings.sourcebutton"  /> 
        </td>
      </tr> 
    </table>
    <div className={settings.container} >
     <table className={settings.left_even}>
          <tr>
            <td className={settings.label} id="width">
              Width
            </td>
          </tr>
          <tr>
            <td style={{display: "flex", height: "51px","align-items": "center"}}>
              <div className={settings.widthSlider} onMouseOut={clearSlider} id="width_slider">
                <div>
                  <input onChange={handleField} value={props.width} name="width" max="1000" min="1" type="range" />
                </div>
              </div>
              <FontAwesomeIcon onMouseOver={ openSlider } id="width_icon" className={ settings.icon } icon={ faArrowsAltH } />
              <div id="width_px" className={settings.px}>  PX </div>
            </td>
            <td>
              <input onChange={handleField} value={props.width} onFocus={highLight} onBlur={dehighLight} type="text" name="width" placeholder="12px" /> 
            </td>
          </tr> 
          <tr>
            <td className={settings.label} id="marginLeft">
              MarginLeft
            </td>
          </tr>
          <tr>
            <td style={{display: "flex", height: "51px","align-items": "center"}}>
              <FontAwesomeIcon id="marginLeft_icon" className={ settings.icon } icon={ faLongArrowAltRight } />
              <div id="marginLeft_px" className={settings.px}>  PX </div>
            </td>
            <td>
              <input onChange={handleField} value={props.marginLeft} onFocus={highLight} onBlur={dehighLight} type="text" name="marginLeft" placeholder="12px" /> 
            </td>
          </tr> 
          
        </table>

        <table className={settings.right_even}>
          <tr>
            <td className={settings.label} id="height">
              Height
            </td>
          </tr>
          <tr>
            <td style={{display: "flex", height: "51px","align-items": "center"}}>
              <div id="height_slider" className={settings.heightSlider} onMouseOut={clearSlider} id="height_slider">
                <div>
                  <input onChange={handleField} value={props.height} name="height" max="1000" min="1" type="range" />
                </div>
              </div>
              <FontAwesomeIcon onMouseOver={ openSlider } id="height_icon" className={ settings.icon } icon={ faArrowsAltV } />
              <div id="height_px" className={settings.px}>  PX </div>
            </td>
            <td>
              <input onChange={handleField} value={props.height} onFocus={highLight} onBlur={dehighLight} type="text" name="height" placeholder="12px" /> 
            </td>
          </tr> 
          <tr>
            <td className={settings.label} id="marginTop">
              MarginTop
            </td>
          </tr>
          <tr>
            <td style={{display: "flex", height: "51px","align-items": "center"}}>
              <FontAwesomeIcon id="marginTop_icon" className={ settings.icon } icon={ faLongArrowAltDown } />
            </td>
            <td>
              <input onChange={handleField} value={props.marginTop} onFocus={highLight} onBlur={dehighLight} type="text" name="marginTop" placeholder="12px" /> 
            </td>
          </tr> 
        </table>
      </div>
    </div>
  )
}
export const ImageSettingsExtension = ({ src }) => {
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
    <div >
    <table className={settings.sourcetable}>
      <tr>
        <td className={settings.label}>
          Upload:
        </td>
      </tr>
      <tr>
        <td>
          <label>
            <div>
              <FontAwesomeIcon className={ settings.fileicon } icon={ faFileUpload } />
              <input type="file" placeh className="settings.sourcefile"  /> 
            </div>
          </label>
        </td>
      </tr> 
    </table>
    <br />
      <table className={settings.sourcetable}>
      <tr>
        <td className={settings.label} id="src">
          URL:
        </td>
      </tr>
      <tr>
        <td>
          <FontAwesomeIcon id="src_icon" className={ settings.icon } icon={ faLink } />
        </td>
        <td>
          <input className={settings.text} onChange={handleField} value={props.src} onFocus={highLight} onBlur={dehighLight} type="text" name="src" placeholder="URL of image" /> 
        </td>
      </tr> 
    </table>
    </div>
  )
}
Image.craft = {
  props: { 
    height: "250",
    width: "250",
    marginLeft: "0px", 
    marginTop: "0px",
    settingsExtension: ImageSettingsExtension,
    settingsExtensionName: 'Image Source',
    src: "https://res.cloudinary.com/css-tricks/image/fetch/w_600,q_auto,f_auto/https://cdn4.buysellads.net/uu/7/78180/1608680187-MCSmart_Engage_Custom_Feature_SmartRecs_GetStarted_1x1-_1_.jpg"
  },
  related: {
    settings: ImageSettings,
    resizer: ImageResizer
  }
}