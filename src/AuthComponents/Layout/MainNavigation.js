import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import classes from './MainNavigation.module.css';
import AuthContext from '../Auth/AuthContext';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  
  const isLoggedIn = authCtx.isLoggedIn; // check user Login or not
  const history = useNavigate();

  const logoutHandler= ()=>{
    authCtx.Logout();
    history.replace("/auth");
    // Redirect the user to login page
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
          <li>
            <Link to='/auth'>Login</Link>
          </li>
          )}

          {isLoggedIn && (
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
          )}
          {isLoggedIn && (
             <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
          )}
         
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
