import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom"; 
import admin from '../admin.module.css';

const CURRENT_POST = gql`
	  query Post($id: ID!) {
	  post(id: $id) {
	    title
	    body
	  }
	}
	`;

export default function Settings() {
	return (
		<div className={admin.container}>
			Welcome
		</div>
	)
}