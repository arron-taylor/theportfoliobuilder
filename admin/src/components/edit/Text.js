import { useState } from 'react';
import { Link } from 'react-router-dom'
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import edit from '../../edit.module.css';
import { useNode } from "@craftjs/core";

export default function Text({text, fontSize}) {
  const { connectors: {connect, drag} } = useNode();
	return (
    <div ref={ref => connect(drag(ref))} className={edit.EditableText}>
		  <p style={{fontSize}}>{ text }</p>
    </div>
	)
}