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
          <h2> Login to access your </h2>
          <h1> Account </h1>
      </div>
      <div className={signup.right}>
        right
      </div>
    </div>
  );
}

export default Signup;