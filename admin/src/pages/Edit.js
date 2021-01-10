import { Link, useParams } from "react-router-dom"; 
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import edit from '../edit.module.css';
import axios from 'axios'
import { useState, useEffect, useContext } from 'react';
import  ToolbarLeft  from '../components/edit/ToolbarLeft'
import  ToolbarBottom  from '../components/edit/ToolbarBottom'
import  {Button}  from '../components/edit/Button'
import  Card  from '../components/edit/Card'
import  NavBar  from '../components/edit/NavBar'
import  Container  from '../components/edit/Container'
import  Wrapper  from '../components/edit/Wrapper'
import  Text  from '../components/edit/Text'
import  NavItem  from '../components/edit/NavItem'
import  SettingsPanel  from '../components/edit/SettingsPanel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faDesktop, faSave, faUndo, faRedo, faFileExport } from '@fortawesome/free-solid-svg-icons'
import { Editor, Frame, Element } from "@craftjs/core";


const PAGE = gql`
    query Pages($id: ID) {
      page(id:$id) {
        id
        name
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

  let { page_id } = useParams();

  useEffect( () => {

  if(document.getElementById('toolbar_left')) {
    if (active) {
     document.getElementById('toolbar_left').style.display = 'flex'
    }
    else {
      document.getElementById('toolbar_left').style.display = 'none'
    }
  } 
    console.log(active)
  });

  const {loading, error, data, refetch} = useQuery(PAGE, {
      variables: { id: page_id }
    });

  if (loading) return <> <div id="toolbar_left" /> </>;
  if (error) return window.location = 'http://localhost:3000/404';
  if ( data.page.owner.id != props.user.id  ) return window.location = 'http://localhost:3000/noaccess'
  return (
    <div className={edit.container}> 
      <Editor resolver={{Card, Button, Text, Container, NavBar, NavItem}}> 
      <Frame>
          <Wrapper>
            <Element id='main' canvas>
            <Container>
              <NavBar />
              <Button >Click</Button>
              <Text size="small" text="Hi world!" />
            </Container>
            </Element>
            <ToolbarLeft id="ToolbarLeft" user={data.page.owner} />
            <ToolbarBottom setActive={ () => setActive(prev => !prev)} active={active} />
            <SettingsPanel />
           </Wrapper>
        </Frame>
      </Editor> 

        <h1 className={edit.title}> Page name: {data.page.name} <br /> My components are: {data.page.components.map( comp => {
          return comp.name + ', '
        } )}</h1>

    </div>
  ) 
    
}