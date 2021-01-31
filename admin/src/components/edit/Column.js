import edit from '../../edit.module.css';
import { useNode, useEditor } from '@craftjs/core';
import { useState, useEffect } from 'react';
import { faTrash, faFileUpload, faLongArrowAltRight, faLongArrowAltDown, faLink, faArrowsAltH, faArrowsAltV } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import settings from '../../settings.module.css';
import SettingsPanelExtension from './SettingsPanelExtension'
import FocusHandler from '../../modules/FocusHandler'

export default function Column({children, padding, height, width}) {

  const { connectors: {connect, drag}, hovered, selected, dragged, actions: {setProp} } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
    hovered: state.events.hovered
  }));
  const { query, actions, enabled } = useEditor((state, query) => ({
      enabled: state.options.enabled
    }));

  const { ...collected } = useNode((collector) => {
    return collector
  });
  const duplicate = (e) => {
    const parent = (collected.data.parent)
    const node_to_make = {
      data: collected.data
    }
    const node = query.parseFreshNode(node_to_make).toNode();
    actions.add(node, parent);
  }

  const delete_node = () => {
    actions.delete(collected.id)
  }
  const [draggable, setDraggable] = useState(true);
  const [editable, setEditable] = useState(false);
  useEffect(() => {!selected && setEditable(false)}, [selected]);

  return ( 

    <div style={{height: `${height}px`, width: `${width}px`}} className={edit.columnDroppable} ref={ref => connect(drag(ref))} >
    {selected? 
      <div className={edit.columnBorder}>  
        <div className={edit.columnOptions} >  
          {/*   <FontAwesomeIcon onClick={duplicate} className={ edit.icon } icon={ faPlus } />
          <FontAwesomeIcon onClick={duplicate} className={ edit.icon } icon={ faClone } /> --> */}
          <FontAwesomeIcon onClick={delete_node} className={ edit.icon } icon={ faTrash } /> 
        </div>
      <div className={edit.columnContent}>
       {children} 
      </div>
       </div> : 
      <div className={edit.columnContent}> {children}</div>
      
    }
    </div>
  )
}


export const ColumnSettings = ({ src }) => {
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
    FocusHandler(focused)
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
         Background
        </td>
      </tr>
      <tr>
        <td>
          <SettingsPanelExtension toggle={ e => toggleExtenion(false) } extension={extension} />
          <button style={{border: "1px solid #cecece", background: "#eee", backgroundSize: "cover"}} onClick={ e => toggleExtenion(true) } value={props.src} type="text" className="settings.sourcebutton">
            <FontAwesomeIcon className={ settings.icon } icon={ faFileUpload } />
          </button> 
        </td>
      </tr>  
      <br />
      <tr>
        <td className={settings.label}>
          Content Alignment
        </td>
      </tr>
      <tr>
        <td>
          <SettingsPanelExtension toggle={ e => toggleExtenion(false) } extension={extension} />
          <button style={{border: "1px solid #cecece", background: "url('https://arrontaylor.me/img/alignment_small.png')", backgroundSize: "cover"}} onClick={ e => toggleExtenion(true) } value={props.src} type="text" className="settings.sourcebutton"  /> 
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
Column.craft = {
  props: { 
    height: "100",
    width: "100",
    marginLeft: "0px", 
    marginTop: "0px",
    settingsExtension: ImageSettingsExtension,
    settingsExtensionName: 'Image Source',
    src: "https://res.cloudinary.com/css-tricks/image/fetch/w_600,q_auto,f_auto/https://cdn4.buysellads.net/uu/7/78180/1608680187-MCSmart_Engage_Custom_Feature_SmartRecs_GetStarted_1x1-_1_.jpg"
  },
  related: {
    settings: ColumnSettings,
  }
}