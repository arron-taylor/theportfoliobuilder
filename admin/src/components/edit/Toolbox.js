import { useState} from 'react';
import { Link } from 'react-router-dom'
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import edit from '../../edit.module.css';
import { useEditor } from "@craftjs/core";
import { Button } from './Button'
import  Text  from './Text'
import  Card  from './Card'
import  NavBar  from './NavBar'
import  NavItem  from './NavItem'
import  Container  from './Container'
import  Hero  from './Hero'
import  Image  from './Image'

export const Toolbox = () => {

  const { connectors } = useEditor();
	return (
		<div className={edit.Toolbox}>
     	<button ref={(ref) => connectors.create(ref, <Button> Button Component </Button>)}> Button Component </button>
     	<div ref={(ref) => connectors.create(ref, <Text text='text component' />)}> Text Component </div>
     	<div ref={(ref) => connectors.create(ref, <Card text='text component' />)}> Card Component </div>
     	<div ref={(ref) => connectors.create(ref, <NavBar text='Navbar Component' />)}> Navbar Component </div>
     	<div ref={(ref) => connectors.create(ref, <NavItem text='New Item' />)}> Navbar Item </div>
     	<div ref={(ref) => connectors.create(ref, <Container />)}> New Container </div>
     	<div ref={(ref) => connectors.create(ref, <Hero />)}> Hero Component </div>
     	<div ref={(ref) => connectors.create(ref, <Image />)}> Image Component </div>
    </div>
	)
}