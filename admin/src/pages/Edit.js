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
import  ToolWrapper  from '../components/edit/ToolWrapper'
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
import  EditFrame  from './EditFrame'
import lz from "lzutf8";

import  Random  from '../components/edit/Random'


const PAGE = gql`
    query Pages($id: ID) {
      page(id:$id) {
        id
        name
        page_layout
        owner {
          id
          name
          pages {
            id
            name
          }
        }
        components {
          id
          name
        }
      }
    }`;

export default function Edit(props) {

  const [active, setActive] = useState(true);
  const [json, setJson] = useState(null);

  let { page_id } = useParams();

  const {loading, error, data, refetch} = useQuery(PAGE, {
      variables: { id: page_id },
    });

  if (loading) return <> <div id="toolbar_left" /> </>;
  if (error) return window.location = 'http://localhost:3000/404';
  if ( data.page.owner.id != props.user.id  ) return window.location = 'http://localhost:3000/noaccess'
  return (
    <div className={edit.maincontainer}> 
      <Editor resolver={{Element, ToolWrapper, Card, Button, Text, Image, Container, NavBar, NavItem, MainWrapper, BodyWrapper, ToolbarLeft, ToolbarBottom, SettingsPanel, Template, Hero}}> 
      { data && data.page? 
      <EditFrame page={data.page} /> : <EditFrame page={data.page} />
      }
      </Editor> 

    </div>
  ) 
    
}