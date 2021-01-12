import { useState } from 'react';
import { Link } from 'react-router-dom'
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import edit from '../../edit.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faThLarge, faCube, faPlug, faFileImage, faPalette, faSwatchbook, faSlidersH, faDesktop, faSave, faUndo, faRedo } from '@fortawesome/free-solid-svg-icons'
import { useNode, Element } from '@craftjs/core';

export default function BodyWrapper({background, children, padding = 50}) {
  return (
    	<Element id="BodyWrapper" canvas style={{height: '500px'}}>
      	{children}
      </Element>
  )
}