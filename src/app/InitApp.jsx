import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {Router} from "wouter";
import useHashLocation from '../hooks/useHashLocation';
import Spinner from '../components/Spinner';
import Layout from '../components/layout/Layout.jsx';
import WelcomePage from '../pages/WelcomePage';
import {useUserContext} from "../context/UserContext.jsx";
import Routes from "./Routes.jsx";

const InitApp = ({ children }) => {
  const {
    isAuthenticated,
    isLoading,
    user,
    getAccessTokenSilently
  } = useAuth0();

  const [token, setToken] = useState(null);

  if (isLoading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <WelcomePage />
  }

  console.log('-------------');
  console.log('user', user);
  console.log('token', token);
  console.log('-------------');

  return <h1 className="text-3xl text-white">LOADING...</h1>

  // useEffect(() => {
  //   if (isAuthenticated && !isLoading && !token) {
  //     getAccessTokenSilently().then((token) => setToken(jwtDecode(token)));
  //   }
  // }, [isAuthenticated, isLoading, user]);
  //
  // if (user) {
  //   firstName.setState(user.name.split(" ")[0]);
  //   fullName.setState(user.name);
  // }


  return (
    <Router hook={useHashLocation}>
      <Layout current={location} token={token}>
        <Routes />
      </Layout>
    </Router>
  )
}

export default InitApp;
