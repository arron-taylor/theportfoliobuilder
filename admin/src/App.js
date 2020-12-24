import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";
import { Dashboard, Settings } from './pages'
import axios from 'axios'
import Sidebar from './components/Sidebar'
import Admin from './Admin'
import Signup from './Signup'
import Login from './Login'

function App() {  
  const [user, setUser] = useState({id: '', name: '', email: '', isLoggedIn: false});

  useEffect(() => {
    const token = localStorage.getItem('token')
  //  console.log(token)
    if(token) {
      axios.get('http://localhost:3001/auto_login', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then((response)=> { 
       console.log(response.data)
        setUser(prevState => ({ ...prevState,['id']: response.data.id}));

       // console.log(user);
        setUser(prevState => ({ ...prevState,['isLoggedIn']: true}));
        console.log(user)
       })
    }
  }, []);

  return (
    <>
   <Router>
    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/signup' component={Signup} />
    <Route path="/">
      { user.isLoggedIn? <> <Admin user={user} /> </> : <Login />  }
    </Route> 
    </Switch>
   </Router>
   </>
  );
}

export default App;