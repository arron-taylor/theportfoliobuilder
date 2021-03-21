import { useState, useEffect } from 'react';
import admin from '../admin.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignature } from '@fortawesome/free-solid-svg-icons'
import login from '../login.module.css';
import axios from 'axios';
import lz from "lzutf8";
import FocusHandler from '../modules/FocusHandler'
import AddDialog from './AddDialog/index.js'

export default function AddPage(props) {

  const [page, setPage] = useState({page_type: '', page_kind: '', page_layout: '', name: '', id: ''});
  const [focused, setFocus] = useState({name:false});

   const createPage = (e) => {
    e.preventDefault();
    let data = page;
    let token = localStorage.getItem("token")
    axios.post(
      'http://localhost:3001/makepage', 
      data, 
      { 
        headers: { 
          Authorization: 'Bearer ' + token 
        }
      }).then((data) => { window.location = '/edit/' + data.data.page.id }).catch(error => { console.log(error.response) });
    }
  const handleField = (e) => {
    const { name, value } = e.target;
    setPage(prevState => ({ ...prevState,[name]: value}));
  }
  const highLight = (e) => {
    const { name, value } = e.target;
    setFocus(prevState => ({ ...prevState, [name]:true }));
  }
  const dehighLight = (e) => {
    const { name, value } = e.target;
    setFocus(prevState => ({ ...prevState, [name]:false }));
  }
 

   	return (
		<div id="addBox" style={{display: 'none'}}>
				<div className={admin.overlay}>
					<div id="alertbox"  className={admin.alertbox}> 
						<div id="alertbox_inner" className={admin.alertboxInner}>
										<AddDialog create={createPage} />
							</div>
						</div>
					</div>
			</div>
		)
   
	}
