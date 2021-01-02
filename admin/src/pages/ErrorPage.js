import { Link, useParams } from "react-router-dom"; 
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import error from '../error.module.css';
import axios from 'axios'
import { useState, useEffect } from 'react';
import  ToolbarLeft  from '../components/edit/ToolbarLeft'
import  Alert  from '../components/Alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faDesktop, faSave, faUndo, faRedo } from '@fortawesome/free-solid-svg-icons'

export default function ErrorPage(props) {

  return (
    <div className={error.container}> 
        <h1> Boo... </h1>
        <img src='./ghost.png' />'
        <h2> Sorry about that! <br /> It looks like the page you were looking for does not exist. </h2>
        <h3> Go back to <Link to='/login'> theportfoliobuilder.com </Link> or contact us about a problem. </h3>
      
    </div>
  )
}