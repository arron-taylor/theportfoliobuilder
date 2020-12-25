import { Link, useParams } from "react-router-dom"; 
import admin from '../admin.module.css';
import axios from 'axios'
import { useState, useEffect } from 'react';
import  Toolbar  from '../components/Toolbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

export default function Pages(props) {
	const [page, setPage] = useState({page_type: '', page_kind: '', page_layout: '', name: '', id: ''});
  const [users, setUsers] = useState([]);

	const handleField = (e) => {
    const { name, value } = e.target;
    setPage(prevState => ({ ...prevState,[name]: value}));
  }
  const deletepage = () => {
  	console.log(page);
    let token = localStorage.getItem("token")
  	let data = page;
  	axios.post(
      'http://localhost:3001/deletepage', 
      data, 
      { 
        headers: { 
          Authorization: 'Bearer ' + token 
        }
      }).then(response => { window.location='http://localhost:3000/pages' }).catch(error => { console.log(error.response) });
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
   const deleteprompt = (e) => {

   	console.log(e.target.id);
   	let page_id = e.target.id;
    setPage(prevState => ({ ...prevState, ['id']:page_id }));
   	const alert = document.getElementById('alertbox');
   	alert.style.display = 'block';
   }
   const closealert = (e) => {
   	const alert_type = e.target.name;
   	alert = document.getElementById(alert_type);
   	alert.style.display = 'none';
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
				return <div className={admin.page} key={page.name}> <div className={admin.label}> {page.name} </div> 
					<div className={admin.pagebuttons}> 
						<div id={page.id} onClick={deleteprompt} className={admin.trash}> <FontAwesomeIcon id={page.id} className={ admin.icon } icon={ faTrash } /> </div>   
						<div className={admin.edit}> <FontAwesomeIcon className={ admin.icon } icon={ faPencilAlt } /> </div>  
						</div>
					</div>
				})} 
			</div>

			<div id="alertbox" style={{display: 'none'}}>
				<div className={admin.overlay}>
					<div className={admin.alertbox}> 
						<h1> Delete Page? </h1>
						<div className={admin.content}> 
							<p> Are you sure you want to delete this page? Once you press delete there is no way to recover your page.</p>
						</div>
						<div className={admin.actionbuttons}> 
							<button name='alertbox' onClick={closealert} className={admin.solid}> Cancel </button>
							<button onClick={deletepage} className={admin.invert}> Delete </button>
						</div>
					</div>
				</div>
			</div>

		</div>
	)
}