import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom"; 

const CURRENT_USER = gql`
	  query {
		  user(id:2) {
		    name
		    email
		    avatar
		    pages {
		      id
		      name
		    }
		  }
		}`;


export default function Pages() {

	const {loading, error, data} = useQuery(CURRENT_USER, {
		variables: { id: 1 }
	});
	if (loading) return <> loading... Please wait. </>;
	if (error) return <p> error... </p>;

	return (
		<>
			{data.user.pages.map((page) => {
			return <div key={page.name}> {page.name} has ID #{page.id}</div>
			})}
		</>
	)
}