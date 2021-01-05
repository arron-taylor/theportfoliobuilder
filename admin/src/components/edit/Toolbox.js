import { useState } from 'react';
import { Link } from 'react-router-dom'
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import edit from '../../edit.module.css';
import { useNode, Element, useEditor } from "@craftjs/core";
import { Button } from './Button'

export const Toolbox = () => {
  const { connectors } = useEditor();
	return (
		<div className={edit.Toolbox}>

     	<Button ref={(ref) => connectors.create(ref, <Button> Click me </Button>)}> Drag me </Button>

    </div>
	)
}