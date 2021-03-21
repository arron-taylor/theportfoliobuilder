import { React, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { Dashboard, Analytics, Pages, Inquiries, Settings } from './pages'
import style from './styles.module.css';
import Sidebar from './components/Sidebar'
import Content from './components/Content'

const CURRENT_USER = gql`
    query User($id: ID) {
      user(id:$id) {
        id
        name
        email
        username
        usertype
        avatar
      }
    }`;

function Admin(props) { 
  const [currentTab, setCurrentTab] = useState(window.location.pathname);

	const [open, setOpen] = useState(false);
	const {loading, error, data} = useQuery(CURRENT_USER, {
    variables: { id: props.user.id }
  });
  if (loading) return <> loading... Please wait. </>;
  if (error) return <p> error... </p>;
  return ( 
   
    <Router>
    <div className={style.wrapper}>
			<Sidebar setOpen={() => setOpen(!open)}  open={open} tab={ setCurrentTab } user={data.user} />
      <Content open={open} tab={ currentTab }>
          <Switch>
            <Route exact path="/"> <Redirect to='/dashboard' /> </Route>
            <Route path="/dashboard"> <Dashboard user={data.user} /> </Route>
            <Route path="/analytics" component={ Analytics } /> 
            <Route path="/pages"> <Pages user={data.user} /> </Route> 
            <Route path="/inquiries" component={ Inquiries } /> 
            <Route path="/settings"> <Settings user={data.user} /> </Route> 
          </Switch>
      </Content>
   </div>
   </Router>
  );
}

export default Admin;
