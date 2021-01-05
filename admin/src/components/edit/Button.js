import { useState } from 'react';
import { Link } from 'react-router-dom'
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import edit from '../../edit.module.css';
import { useNode, Element } from "@craftjs/core";

export const Button = ({size, color, children}) => {

  const { connectors: {connect, drag} } = useNode();

	return (
		<button style={{size, color}} ref={(ref) => connect(drag(ref))}>

      {children}

    </button>
	)
}
