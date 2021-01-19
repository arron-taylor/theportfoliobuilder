import { Link } from "react-router-dom"; 
import error from '../error.module.css';

export default function ErrorPage(props) {

  return (
    <div className={error.container}> 
        <h1> Boo... </h1>
        <img src='./ghost.png' />'
        <h2> Sorry about that! <br /> It looks like the page you were looking for does not exist. </h2>
        <h3> Go back to <Link to='/login'> theportfoliobuilder.com </Link> or contact us about a problem. </h3>
      
    </div>
  )
}