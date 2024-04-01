import { jwtDecode } from 'jwt-decode';
import {useState} from "react";
import { useAuth0 } from '@auth0/auth0-react';
import Spinner from '../components/Spinner';
import WelcomePage from '../pages/WelcomePage';
import {useUserContext} from "../context/UserContext.jsx";
import App from "./App.jsx";
import useRequest from "../hooks/useRequest.js";

const InitApp = () => {
  const {
    isAuthenticated,
    isLoading,
    user: auth0User,
    getAccessTokenSilently
  } = useAuth0();
  const apiRequest = useRequest();

  const { setUser, user } = useUserContext();

  const [userFetchComplete, setUserFetchComplete] = useState(false);

  const isInitialized = !!user;

  if (isLoading) {
    return <Spinner/>;
  }

  if (!isAuthenticated) {
    return <WelcomePage/>
  }

  const getUserData = async () => {
    const res = await apiRequest('/user-metadata');
    const accessToken  = await getAccessTokenSilently();
    setUserFetchComplete(true);
    if (res.status === 200) {
      const userData = await res.json();
      setUser({
        ...auth0User,
        ...userData,
        permissions: jwtDecode(accessToken).permissions,
      });
    }
  }

  if (auth0User && !isInitialized && !userFetchComplete) {
    getUserData();
  }

  if (isInitialized) {
    return <App />;
  }

  return <Spinner message="Initializing..." />;
}

export default InitApp;
