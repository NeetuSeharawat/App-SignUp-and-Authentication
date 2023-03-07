import { useState, useRef, useContext } from 'react';
import AuthContext from './AuthContext';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext); // Gurantee that login will get called in this context now

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading,setIsLoading]= useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) =>
  {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    //Adding Validation
   setIsLoading(true);
   let url;
   if(isLogin){
   url= 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCuwdlNK_HArrq59Wc3Qjsd5yNizUCUGHw'
 }else{
  url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCuwdlNK_HArrq59Wc3Qjsd5yNizUCUGHw'
 }
 fetch(
  url,
  {
    method: "POST",
    body: JSON.stringify({
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }
).then((res) => {
  if (res.ok) {
    console.log("user is succesfully signed up");
    return res.json();
  } else {
    res.json().then((data) => {
      authCtx.Login(data.idToken);
      let errorMessage = "Authentication failed";
      if (data && data.error && data.error.message) {
        errorMessage = data.error.message;
      }
      alert(errorMessage);
    });
  }
});

};
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
        {!isLoading && <button>{isLogin?'Login': 'Create Account'}</button>}
         {isLoading && <p>Sending Request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};


export default AuthForm;