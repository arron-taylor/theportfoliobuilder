import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom"; 

const CURRENT_USER = gql`
	  query Pages($id: ID) {
		  user(id:$id) {
		    name
		    email
		    avatar
		    pages {
		      id
		      name
		    }
		  }
		}`;


export default function Pages(props) {
	console.log(props.user)
	const {loading, error, data} = useQuery(CURRENT_USER, {
		variables: { id: props.user.id }
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