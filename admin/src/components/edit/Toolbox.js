import { useState } from 'react';
import { Link } from 'react-router-dom'
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import edit from '../../edit.module.css';
import { useEditor } from "@craftjs/core";
import { Button } from './Button'
import  Text  from './Text'

export const Toolbox = () => {
  const { connectors } = useEditor();
	return (
		<div className={edit.Toolbox}>
     	<button ref={(ref) => connectors.create(ref, <Button> Button Component </Button>)}> Button Component </button>
     	<button ref={(ref) => connectors.create(ref, <Text text='text component' />)}> Text Component </button>
    </div>
	)
}