import edit from '../edit.module.css';
import { useState, useEffect, React } from 'react';
import  ToolbarLeft  from '../components/edit/ToolbarLeft'
import  ToolbarBottom  from '../components/edit/ToolbarBottom'
import  MainWrapper  from '../components/edit/MainWrapper'
import  BodyWrapper  from '../components/edit/BodyWrapper'
import  SettingsPanel  from '../components/edit/SettingsPanel'
import { useEditor, Frame } from "@craftjs/core";
import  Template  from '../components/Template'
import  ToolWrapper  from '../components/edit/ToolWrapper'
import lz from "lzutf8";


export default function EditFrame(props) {

  const [active, setActive] = useState(true);

  const { query, actions, selectedNodeId, selectedNode } = useEditor((state, query) => ({
    selectedNodeId: state.events.selected,
  }));

  const nodeTree = query.parseReactElement(<ToolWrapper ><Template type="load" /><ToolbarLeft id="toolbar_left" user={props.page.owner} /><ToolbarBottom page={props.page} setActive={ () => setActive(prev => !prev)} active={active}  /><SettingsPanel /></ToolWrapper >).toNodeTree();

  useEffect( () => {

  if(document.getElementById('toolbar_left')) {
    if (active) {
     document.getElementById('toolbar_left').style.display = 'flex'
    }
    else {
      document.getElementById('toolbar_left').style.display = 'none'
    }
  } 
    //lz.decompress(lz.decodeBase64(props.page.page_layout)).substr( 0, ( lz.decompress(lz.decodeBase64(props.page.page_layout)).length - 1) + "}" )     
  });
  useEffect(() => {
    
    actions.addNodeTree(nodeTree, "ROOT");

  },[]);
  return (
    <div id="" className={edit.maincontainer}> 
      {  props.page.page_layout? 
      <Frame id="frame" data={ lz.decompress(lz.decodeBase64(props.page.page_layout) )}>
      <MainWrapper>
            <BodyWrapper>
            </BodyWrapper>
           </MainWrapper>
        </Frame> :  
        <Frame>
          <MainWrapper>
            <BodyWrapper>
            </BodyWrapper>
           </MainWrapper>
        </Frame>
      }
    </div>
  ) 
    
}