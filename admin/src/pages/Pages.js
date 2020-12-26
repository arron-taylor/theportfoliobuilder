import { Link, useParams } from "react-router-dom"; 
import { gql, useQuery } from "@apollo/client";
import admin from '../admin.module.css';
import axios from 'axios'
import { useState, useEffect } from 'react';
import  Toolbar  from '../components/Toolbar'
import  Alert  from '../components/Alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

const PAGES = gql`
    query UsersPages($id: ID) {
      userspages(id:$id) {
        id
        name
      }
    }`;

export default function Pages(props) {
	const [page, setPage] = useState({page_type: '', page_kind: '', page_layout: '', name: '', id: ''});

  const {loading, error, data, refetch} = useQuery(PAGES, {
    variables: { id: props.user.id }
  });
  if (loading) return <> loading... Please wait. </>;
  if (error) return <p> error... </p>;

	const handleField = (e) => {
    const { name, value } = e.target;
    setPage(prevState => ({ ...prevState,[name]: value}));
  }
  
  const createPage = (e) => {
    e.preventDefault();
    let data = page
    let token = localStorage.getItem("token")
    axios.post(
      'http://localhost:3001/makepage', 
      data, 
      { 
        headers: { 
          Authorization: 'Bearer ' + token 
        }
      }).then(() => { refetch() }).catch(error => { console.log(error.response) });
    }

   const deleteprompt = (item) => {
   	document.getElementById("alertbox").style.display = 'block';
		setPage(prevState => ({ ...prevState, ['id']:item.id }));
		setPage(prevState => ({ ...prevState, ['name']:item.name }));
   }
   
	return (
		<div className={admin.container}>
			<Toolbar />
			<form onSubmit={createPage}>
            <input type="text" name='name' onChange={handleField} value={page.name} placeholder="name..." />
            <button color='info'> Create New Page </button>
        </form>
			<div className={admin.pageContainer}>
				{data.userspages.map((page) => {
				return <div className={admin.page} key={page.name}> <div className={admin.label}> {page.name} </div> 
					<div className={admin.pagebuttons}> 
						<div onClick={( () => { deleteprompt(page) } )} className={admin.trash}> <FontAwesomeIcon className={ admin.icon } icon={ faTrash } /> </div>   
						<div className={admin.edit}> <FontAwesomeIcon className={ admin.icon } icon={ faPencilAlt } /> </div>  
						</div>
					</div>
				})} 
			</div>

			<Alert refetch={ () => refetch()} page={page} />

		</div>
	)
}