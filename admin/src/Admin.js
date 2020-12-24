import { React, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect, Link
} from "react-router-dom";
import { Dashboard, Analytics, Pages, Inquiries, Settings } from './pages'
import axios from 'axios'
import style from './styles.module.css';
import Sidebar from './components/Sidebar'
import Content from './components/Content'

function Admin(props) { 

  const [user, setUser] = useState(props.user);
  const [currentTab, setCurrentTab] = useState(window.location.pathname);

  return (
    <Router>
    <div className={style.wrapper}>
      <Sidebar tab={ setCurrentTab } user={user} />
      <Content tab={ currentTab }>
        
          <Switch>
            <Route exact path="/"> <Redirect to='/dashboard' /> </Route>
            <Route path="/dashboard" component={ Dashboard } /> 
            <Route path="/analytics" component={ Analytics } /> 
            <Route path="/pages"> <Pages user={props.user} /> </Route> 
            <Route path="/inquiries" component={ Inquiries } /> 
            <Route path="/settings" component={ Settings } /> 
          </Switch>
      </Content>
   </div>
   </Router>
  );
}

export default Admin;