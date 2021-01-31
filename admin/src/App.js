import { React, useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import axios from 'axios'
import Admin from './Admin'
import Signup from './Signup'
import Login from './Login'
import User from './pages/User'
import Edit from './pages/Edit'
import ErrorPage from './pages/ErrorPage'
import NoAccess from './pages/NoAccess'

function App() {  
  const [user, setUser] = useState({id: '', name: '', email: '', isLoggedIn: false});

  useEffect(() => {
    const token = localStorage.getItem('token');
  //  console.log(token)
    if(token) {
      axios.get('http://localhost:3001/auto_login', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then((response)=> { 
        setUser(prevState => ({ ...prevState,['id']: response.data.id}));
        setUser(prevState => ({ ...prevState,['name']: response.data.name}));
        setUser(prevState => ({ ...prevState,['isLoggedIn']: true}));
       })
    }
  }, []);

  return (
    <>
   <Router>
    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/signup' component={Signup} />
      <Route path='/404' component={ErrorPage} />
      <Route path='/noaccess' component={NoAccess} />
      
      <Route path="/edit/:page_id"> 
        { user.isLoggedIn? <> <Edit user={user} /> </> : <Login />  }
       </Route> 
       <Route path='/:username/:page_id'>
        <User user={user} />
      </Route>
    <Route path="/">
        { user.isLoggedIn? <> <Admin user={user} /> </> : <Login />  }
    </Route> 

    </Switch>
   </Router>
   </>
  );
}

export default App;