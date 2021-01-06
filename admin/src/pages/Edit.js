import { Link, useParams } from "react-router-dom"; 
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import edit from '../edit.module.css';
import axios from 'axios'
import { useState, useEffect, useContext } from 'react';
import  ToolbarLeft  from '../components/edit/ToolbarLeft'
import  {Button}  from '../components/edit/Button'
import  Card  from '../components/edit/Card'
import  Container  from '../components/edit/Container'
import  Text  from '../components/edit/Text'
import  SettingsPanel  from '../components/edit/SettingsPanel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faDesktop, faSave, faUndo, faRedo } from '@fortawesome/free-solid-svg-icons'
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

  let { page_id } = useParams();

  const {loading, error, data, refetch} = useQuery(PAGE, {
      variables: { id: page_id }
    });

  if (loading) return <> <div id="toolbar_left" /> </>;
  if (error) return window.location = 'http://localhost:3000/404';
  if ( data.page.owner.id != props.user.id  ) return window.location = 'http://localhost:3000/noaccess'
  return (
    <div className={edit.container}> 

      <Editor resolver={{Card, Button, Text, Container}}> 

      <Frame>
        <Element is={Container} background="#eee" canvas>

        <ToolbarLeft user={data.page.owner} />

        <SettingsPanel />

          <Button >Click</Button>
          <Text size="small" text="Hi world!" />
          <Container padding={6} background="#999">
            <Text size="small" text="It's me again!" />
          </Container>
        </Element>

      </Frame>

      </Editor> 

        <h1 className={edit.title}> Page name: {data.page.name} <br /> My components are: {data.page.components.map( comp => {
          return comp.name + ', '
        } )}</h1>

        <div className={edit.toolbar_bottom}>
        <FontAwesomeIcon className={ edit.icon_active } icon={ faDesktop } />
        <FontAwesomeIcon onClick={() => { window.location = 'http://localhost:3000/pages' }} className={ edit.icon } icon={ faHome } />
        <FontAwesomeIcon className={ edit.icon } icon={ faSave } />
        <FontAwesomeIcon className={ edit.icon } icon={ faUndo } />
        <FontAwesomeIcon className={ edit.icon } icon={ faRedo } />
        </div>
    </div>
  )
}