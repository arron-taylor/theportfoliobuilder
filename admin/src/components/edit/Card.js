import { useState } from 'react';
import { Link } from 'react-router-dom'
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import edit from '../../edit.module.css';
import  Text  from "./Text";
import  {Button}  from "./Button";
import  Container  from "./Container";
import {useNode, Element} from "@craftjs/core";

export default function Card({background, padding = 20}) {
	return (
   <Container background={background} padding={padding} className={edit.Card}>
      <Element id="text" canvas> // Canvas Node of type div
        <Text text="Title"  />
        <Text text="Subtitle"/>
      </Element>
      <Element id="buttons" canvas> // Canvas Node of type div
        <Button text="Learn more" />
      </Element>
    </Container>
	)
}