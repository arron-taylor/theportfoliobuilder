import { useParams } from "react-router-dom"; 
import { gql, useQuery } from "@apollo/client";
import edit from '../edit.module.css';
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
import  Column  from '../components/edit/Column'
import  ColumnContainer  from '../components/edit/ColumnContainer'
import  ToolWrapper  from '../components/edit/ToolWrapper'
import  SettingsPanel  from '../components/edit/SettingsPanel'
import { Editor, Frame } from "@craftjs/core";
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


  let { username } = useParams();
  let { page_id } = useParams();

  console.log(username, page_id);

  const {loading, error, data} = useQuery(PAGE, {
      variables: { id: page_id }
    });

  if (loading)  console.log("LOADING");
  if (error)  console.log("ERROR!");

  
  return (
    <div className={edit.maincontainer}> 
      <Editor enabled={false} resolver={{ Column, ColumnContainer, Element, ToolWrapper, Card, Button, Text, Image, Container, NavBar, NavItem, MainWrapper, BodyWrapper, ToolbarLeft, ToolbarBottom, SettingsPanel, Template, Hero}}> 
      { data? 

        <Frame data={lz.decompress(lz.decodeBase64(data.page.page_layout))}>


        </Frame> : null}
      
      

      </Editor> 
   
    </div>

  )
    
}