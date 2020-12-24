import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom"; 


const CURRENT_POST = gql`
	  query Post($id: ID!) {
	  post(id: $id) {
	    title
	    body
	  }
	}
	`;

export default function Dashboard() {
	return (
		<>
			This is the Dashboard!
		</>
	)
}