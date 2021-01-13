import { Link, useParams } from "react-router-dom"; 
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import edit from '../edit.module.css';
import axios from 'axios'
import { useState, useEffect, useContext, React, useRef } from 'react';
import  ToolbarLeft  from '../components/edit/ToolbarLeft'
import  ToolbarBottom  from '../components/edit/ToolbarBottom'
import  {Button}  from '../components/edit/Button'
import  Card  from '../components/edit/Card'
import  NavBar  from '../components/edit/NavBar'
import  Container  from '../components/edit/Container'
import  MainWrapper  from '../components/edit/MainWrapper'
import  BodyWrapper  from '../components/edit/BodyWrapper'
import  Text  from '../components/edit/Text'
import  NavItem  from '../components/edit/NavItem'
import  Hero  from '../components/edit/Hero'
import  Image  from '../components/edit/Image'
import  SettingsPanel  from '../components/edit/SettingsPanel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faDesktop, faSave, faUndo, faRedo, faFileExport } from '@fortawesome/free-solid-svg-icons'
import { Editor, Frame, Element } from "@craftjs/core";
import  Template  from '../components/Template'
import lz from "lzutf8";


const PAGE = gql`
    query Pages($id: ID) {
      page(id:$id) {
        id
        name
        page_layout
      }
    }`;


export default function User(props) {

  const [active, setActive] = useState(true);
  const [json, setJson] = useState(null);

  let { username } = useParams();
  let { page_id } = useParams();

  console.log(username, page_id);


  useEffect( () => {
    if(document.getElementById('toolbar_left')) {
      document.getElementById('toolbar_left').style.display = "none"
    } 
    if(document.getElementById('toolbar_bottom')) {
      document.getElementById('toolbar_bottom').style.display = "none"
    }
  });


  const {loading, error, data, refetch} = useQuery(PAGE, {
      variables: { id: page_id }
    });

  if (loading)  console.log("LOADING");
  if (error)  console.log("ERROR!");

  
  return (
    <div className={edit.maincontainer}> 
      <Editor enabled={false} resolver={{Card, Button, Text, Image, Container, NavBar, NavItem, MainWrapper, BodyWrapper, ToolbarLeft, ToolbarBottom, SettingsPanel, Template, Hero}}> 
      { data? 

        <Frame data={lz.decompress(lz.decodeBase64(data.page.page_layout))}>


        </Frame> : null}
      
      

      </Editor> 
   
    </div>

  )
    
}