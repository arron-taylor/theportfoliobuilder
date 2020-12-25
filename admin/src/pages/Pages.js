import { Link, useParams } from "react-router-dom"; 
import admin from '../admin.module.css';
import axios from 'axios'
import { useState, useEffect } from 'react';
import  Toolbar  from '../components/Toolbar'


export default function Pages(props) {
	const [page, setPage] = useState({page_type: '', page_kind: '', page_layout: '', name: ''});
  const [users, setUsers] = useState([]);

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
      }).then(response => { window.location='http://localhost:3000/pages' }).catch(error => { console.log(error.response) });
    }
	return (
		<div className={admin.container}>
			<Toolbar />
			<form onSubmit={createPage}>
            <input type="text" name='name' onChange={handleField} value={page.name} placeholder="name..." />
            <button color='info'> Create New Page </button>
        </form>
			<div className={admin.pageContainer}>
				{props.user.pages.map((page) => {
				return <div className={admin.page} key={page.name}> <div className={admin.label}> {page.name} </div></div>
				})} 
			</div>


			

		</div>
	)
}