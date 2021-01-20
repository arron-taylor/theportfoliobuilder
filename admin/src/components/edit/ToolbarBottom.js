import { useState, React } from 'react';
import edit from '../../edit.module.css';
import SnackBarNotification from '../SnackBarNotification'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDesktop, faSave, faUndo, faRedo, faFileExport, faHome } from '@fortawesome/free-solid-svg-icons'
import { useEditor } from "@craftjs/core";
import lz from "lzutf8";
import copy from 'copy-to-clipboard';
import axios from 'axios'

  export default function ToolbarBottom(props) {

  const [statetoload, setstatetoload] = useState(props.page);

  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled
  }));


  const deleteprompt = (item) => {
    document.getElementById("alertbox").style.display = 'block';
   }
 
  const undo = () => {
    actions.history.undo()
  } 
  const redo = () => {
    actions.history.redo()
  }
  const updatePage = () => {

 //   const toolbarbottom = document.getElementById('toolbar_bottom');
 //   const toolbarleft = document.getElementById('toolbar_left');

    const json = query.serialize();
  //  console.log(json)
    const newJson = ( json.substring(0, json.indexOf("ToolWrapper")-39) +  json.substring(json.indexOf("SettingsPanel")+151));
  //  console.log(newJson)
    const final = ( newJson.substring(0, newJson.indexOf("nodes")+20)) + newJson.substring(newJson.indexOf("nodes")+33) 

 //  console.log(final)
 //   copy(lz.encodeBase64(lz.compress(json)));
  //  setstatetoload(prevState => ({ ...prevState, ['id']: props.page.id }));
  //  setstatetoload(prevState => ({ ...prevState, ['page_layout']:(lz.encodeBase64(lz.compress(final))) })); 

    let token = localStorage.getItem("token")
    let data = {page_layout: (lz.encodeBase64(lz.compress(final))), id: props.page.id};
    axios.post(
      'http://localhost:3001/editpage', 
      data, 
      { 
        headers: { 
          Authorization: 'Bearer ' + token 
        }
      }).then( () => { notification() } ).catch(error => { console.log(error.response) });

  }
  const notification = () => {
    document.getElementById('SnackBarNotification').style.opacity = '1'
    setTimeout(() => {
      document.getElementById('SnackBarNotification').style.opacity = '0'
    }, 2000)
  }
  const setActive = (_, value) => {

    actions.setOptions(options => options.enabled = !options.enabled)
    props.setActive();
    if(enabled) {
      document.getElementById('preview').style.color = '#989898'
      document.getElementById('preview').style.background = '#FFF'

    }
    else {
      document.getElementById('preview').style.color = '#7165E3'
      document.getElementById('preview').style.background = '#F5F6FA'
    }
   }

	return ( 
		<div id="toolbar_bottom" className={edit.toolbar_bottom}>
    <FontAwesomeIcon id="preview" onClick={() =>  setActive()  }  className={ edit.icon_active } icon={ faDesktop } />
    <FontAwesomeIcon onClick={() => { window.location = 'http://localhost:3000/pages' }} className={ edit.icon } icon={ faHome } />
    <FontAwesomeIcon onClick={updatePage}  className={ edit.icon } icon={ faSave } />

    <FontAwesomeIcon onClick={( () => { deleteprompt({name: "Arron"}) } )} className={ edit.icon } icon={ faFileExport } />
   
    <FontAwesomeIcon onClick={undo} className={ edit.icon } icon={ faUndo } />
    <FontAwesomeIcon onClick={redo} className={ edit.icon } icon={ faRedo } />
    <SnackBarNotification />
    </div>
	)
}