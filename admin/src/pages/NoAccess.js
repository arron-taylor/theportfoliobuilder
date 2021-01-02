import { Link, useParams } from "react-router-dom"; 
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import error from '../error.module.css';
import axios from 'axios'
import { useState, useEffect } from 'react';
import  ToolbarLeft  from '../components/edit/ToolbarLeft'
import  Alert  from '../components/Alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faDesktop, faSave, faUndo, faRedo } from '@fortawesome/free-solid-svg-icons'

export default function NoAccess(props) {

  return (
    <div className={error.accesscontainer}> 
        <h1> Ummm.... </h1>
        <img src='./frog.png' />
        <h2> Well this is weird. <br /> It looks like you aren't allowed to access the page you were looking for. </h2>
        <h3> Go back to <Link to='/login'> theportfoliobuilder.com </Link> or contact us about a problem. </h3>
      
    </div>
  )
}