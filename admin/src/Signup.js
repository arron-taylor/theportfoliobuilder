import { React, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect, Link
} from "react-router-dom";
import { Dashboard, Analytics, Pages, Inquiries, Settings } from './pages'
import axios from 'axios'
import signup from './signup.module.css';
import style from './styles.module.css';
import Sidebar from './components/Sidebar'
import Content from './components/Content'

function Signup() { 

  const [user, setUser] = useState({name: '', email: '', isLoggedIn: false});
  const [currentTab, setCurrentTab] = useState(window.location.pathname);

  return (
    <div className={style.wrapper}>
      <div className={signup.left}>
          <h2> Create an account to continue </h2>
          <h1> Getting Started </h1>

          <h3> Already registered? <Link to ="/login" > Login </Link> </h3>

      </div>
     <div className={signup.right}>
        <h1> Create. Build. Edit. </h1>
        <img src='./computer.png' />'
        <h2> ALL-IN-ONE </h2>
        <h3> Composable Cloud Portfolio </h3>
        <h4> An online portfolio manager with a drag and drop page builder that gives you the freedom to easily manage your online portfolio to grow your as your experience does. </h4>
      </div>
    </div>
  );
}

export default Signup;