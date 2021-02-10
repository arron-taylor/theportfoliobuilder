import { useEffect, useState } from "react"
import {Switch, Route} from "react-router-dom"
import admin from '../admin.module.css'
import  Toolbar  from '../components/Toolbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAstronaut, faChevronDown, faLock, faUser, faLayerGroup, faUserTag, faAt } from '@fortawesome/free-solid-svg-icons'
import FocusHandler from '../modules/FocusHandler'
import axios from 'axios'
import ProfileSettings from '../components/settings/ProfileSettings'

export default function Settings(props) {
	const [tab, setTab] = useState();
  useEffect(() => {
    setTab(<ProfileSettings user={props.user} />)
  }, []);
	return (
		<div className={admin.container}>
		<Toolbar tab={tab} user={props.user} setTab={setTab} type='settings' />
  		<div className={admin.settingscontainer}>
          { tab }
  		</div>
		</div>
	)
}