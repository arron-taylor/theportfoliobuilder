import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import edit from '../../edit.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faThLarge, faCube, faPlug, faFileImage, faPalette, faSwatchbook, faSlidersH, faDesktop, faSave, faUndo, faRedo, faFileExport, faHome } from '@fortawesome/free-solid-svg-icons'
import {Toolbox} from './Toolbox'
import { useEditor } from "@craftjs/core";
import lz from "lzutf8";
import copy from 'copy-to-clipboard';

let pathname = window.location.pathname.substring(1).slice(5);
let current = pathname.charAt(0).toUpperCase() + pathname.slice(1);

export default function ToolbarBottom(props) {

  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled
  }));

  const deleteprompt = (item) => {
    document.getElementById("alertbox").style.display = 'block';
   }

  let iconName = 'edit.icon_active'

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
    <FontAwesomeIcon onClick={( () => { deleteprompt({name: "Arron"}) } )} className={ edit.icon } icon={ faSave } />

    <FontAwesomeIcon onClick={() => { const json = query.serialize();copy(lz.encodeBase64(lz.compress(json)))}} className={ edit.icon } icon={ faFileExport } />
    <FontAwesomeIcon className={ edit.icon } icon={ faUndo } />
    <FontAwesomeIcon className={ edit.icon } icon={ faRedo } />
    </div>
	)
}