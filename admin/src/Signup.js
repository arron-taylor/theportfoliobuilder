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
import FocusHandler from './modules/FocusHandler'
import { Step1, Step2, Step3 } from './pages/signup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt, faLock, faUser } from '@fortawesome/free-solid-svg-icons'

function Signup() { 

  const [user, setUser] = useState({name: '', email: '', password: ''});
  const [focused, setFocus] = useState({password:false});

  const toSecond = (changed) => {
    nextStep()
    setTimeout(() => {
     setStep(<Step2 next={toLast} back={toFirst} user={changed} />)
    }, 250)
  }
  const toFirst = (changed) => {
    const signupform = document.getElementById('signupform');
    signupform.style.opacity = 0;
    signupform.style.width = '50%';
      setStep(<Step1 setUser={setUser} user={changed} next={toSecond} />)

    setTimeout(() => {
      signupform.style.opacity = 1
    }, 250)
  }
  const toLast = (changed) => {
    nextStep()
    setTimeout(() => {
     setStep(<Step3 back={toSecond} user={changed} />)
    }, 250)
  }
  const [step, setStep] = useState(<Step1 setUser={setUser} user={user} next={toSecond} />);

  const handleField = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({ ...prevState,[name]: value}));
  }
  const highLight = (e) => {
    const { name, value } = e.target;
    setFocus(prevState => ({ ...prevState, [name]:true }));
  }
  const dehighLight = (e) => {
    const { name, value } = e.target;
    setFocus(prevState => ({ ...prevState, [name]:false }));
  }
  useEffect( () => {
    FocusHandler(focused)
  });
  const nextStep = (e) => {
    const signupform = document.getElementById('signupform');
    signupform.style.opacity = 0;
    signupform.style.width = '200%';
    setTimeout(() => {
      signupform.style.opacity = 1
    }, 250)
  }
  const HandleSubmit = (e) => {
    e.preventDefault();
    // fetch('http://localhost:3001/users').then(response => response.json()).then(data => console.log(data));
    let data = user;
    axios.post('http://localhost:3001/login', data).then( (response) => { 
      localStorage.setItem("token", response.data.jwt);console.log(response.data.jwt); if(response.status == 200) { window.location = 'http://localhost:3000/dashboard' } }).catch((error) => { 
        console.log(error.response) 
      });
  }

  return (
    <div className={signup.wrapper}>
      <div id="signupform" className={signup.left}>
          { step }
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