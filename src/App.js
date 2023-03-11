import { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './AuthComponents/Layout/Layout';
import UserProfile from './AuthComponents/Profile/UserProfile';
import AuthPage from './Authpages/AuthPage';
import HomePage from './Authpages/HomePage';
import AuthContext from './AuthComponents/Auth/AuthContext';


function App() {
  const authCtx = useContext(AuthContext);
  return (
     
    <Layout>
       <Switch> 
            <Route path='/' exact>
              <HomePage />
            </Route>
            {!authCtx.isLoggedIn && (
            <Route path='/auth'>
              <AuthPage />
            </Route>
            )}
            <Route path='/profile'>
            {authCtx.isLoggedIn && <UserProfile />}
              {!authCtx.isLoggedIn && <Redirect to="/auth" />}
              </Route>
              
              {/*when above cases are invalid then it will render */}
              <Route path="*">
              <Redirect to="/" />
            </Route>
        </Switch>
    </Layout>
   );
}

export default App;

