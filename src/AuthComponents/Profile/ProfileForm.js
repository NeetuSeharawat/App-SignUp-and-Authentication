import {useRef, useContext} from 'react';
import { useHistory } from 'react-router-dom';
// we can call useHistory hook as well instead of useNavigate hook depends on version
import classes from './ProfileForm.module.css';
import AuthContext from '../Auth/AuthContext';

const ProfileForm = () => {
  const history = useHistory();
  const newPasswordInputRef =useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = event =>{
    event.preventDefault();

    const enteredNewPassword= newPasswordInputRef.current.value;
    // Add Vaildation
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCuwdlNK_HArrq59Wc3Qjsd5yNizUCUGHw',
     {
      method:'POST',
     body: JSON.stringify({
      idToken: authCtx.token,
      password: enteredNewPassword,
      returnSecureToken: false,
    }),
      headers: {
        'Content-Type':'application/json'
        
        //to ensure jSON data come here.
      }
    }).then(res =>{
      history.replace('/'); // navigate to other routers using push/replace methods.
      //assumption : Always Succeeds!
    })
  };
  return (
    <form className={classes.form} onSubmit= {submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength= '7 ' ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
