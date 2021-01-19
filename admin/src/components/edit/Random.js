import React, {useCallback} from "react";
import ContentEditable from 'react-contenteditable'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import edit from '../../edit.module.css';
import { useNode, useEditor } from "@craftjs/core";
import settings from '../../settings.module.css';
import style from '../../styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt, faLock, faPenNib, faFillDrip, faFont, faAlignLeft, faAlignCenter, faAlignRight, faIndent, faOutdent, faListUl, faListOl, faHighlighter, faCode } from '@fortawesome/free-solid-svg-icons'

export default function Random({height, width, src, marginLeft, marginTop}) {

   
   const { query, actions } = useEditor((state, query) => ({
    hoveredNodeId: state.events.hovered
  }));

  const freshNode = {
            data: {
                type: 'h1'
            }
        };
        
   const node = query.parseFreshNode(freshNode).toNode();
   
   actions.add(node, 'ROOT');

	return (
    <div >
    
    
    </div>
	)
}
