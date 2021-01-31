import { gql, useQuery } from "@apollo/client";
import admin from '../admin.module.css';
import { useState } from 'react';
import  Toolbar  from '../components/Toolbar'
import  Alert  from '../components/Alert'
import  AddPage  from '../components/AddPage'
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

  const edit = (e) => {
    window.location = 'http://localhost:3000/edit/' + e;
  }
   const deleteprompt = (item) => {
    document.getElementById("alertbox").style.display = 'block';
    setPage(prevState => ({ ...prevState, ['id']:item.id }));
    setPage(prevState => ({ ...prevState, ['name']:item.name }));
   }
   
  return (
    <div className={admin.container}>
      <Toolbar />
      <div className={admin.pageContainer}>
        {data.userspages.map((page) => {
        return <div className={admin.page} key={page.name}> <div className={admin.label}> {page.name} </div> 
          <div className={admin.pagebuttons}> 
            <div onClick={( () => { deleteprompt(page) } )} className={admin.trash}> <FontAwesomeIcon className={ admin.icon } icon={ faTrash } /> </div>   
            <div onClick={( () => { edit(page.id) } )} className={admin.edit}> <FontAwesomeIcon className={ admin.icon } icon={ faPencilAlt } /> </div>  
            </div>
          </div>
        })} 
      </div>

      <Alert type="delete" refetch={ () => refetch()} page={page} />

      <AddPage type="delete" refetch={ () => refetch()} page={page} />

    </div>
  )
}