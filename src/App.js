
import { Route } from 'react-router-dom';
import Layout from './AuthComponents/Layout/Layout';
import UserProfile from './AuthComponents/Profile/UserProfile';
import AuthPage from './Authpages/AuthPage';
import HomePage from './Authpages/HomePage';
import AuthForm from "./AuthComponents/Auth/AuthForm";
import { AuthContextProvider } from './AuthComponents/Auth/AuthContext';


function App() {
  return (
    <AuthForm>
      <AuthContextProvider>
      <Layout>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/auth'>
          <AuthPage />
        </Route>
        <Route path='/profile'>
          <UserProfile />
        </Route>
      
    </Layout>
    </AuthContextProvider>
    </AuthForm>

  );
}

export default App;

