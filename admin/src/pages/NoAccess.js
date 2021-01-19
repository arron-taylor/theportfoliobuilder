import { Link } from "react-router-dom"; 
import error from '../error.module.css';

export default function NoAccess(props) {

  return (
    <div className={error.accesscontainer}> 
        <h1> Ummm.... </h1>
        <img src='./frog.png' />
        <h2> Well this is weird. <br /> It looks like you aren't allowed to access the page you were looking for. </h2>
        <h3> Go back to <Link to='/login'> theportfoliobuilder.com </Link> or contact us about a problem. </h3>
      
    </div>
  )
}