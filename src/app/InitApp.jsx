import { jwtDecode } from 'jwt-decode';
import {useEffect, useState} from "react";
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

  const {
    permissions,
    token,
    user,
  } = useUserContext();

  const [userFetchComplete, setUserFetchComplete] = useState(false);
  const [userToken, setUserToken] = useState();

  useEffect(() => {
    if (token.state !== userToken && !!userToken) {
      token.setState(userToken);
    }
  }, [token.state, userToken])

  const isInitialized =
    !!permissions.state
    && !!token.state
    && !!user.state;

  if (isLoading) {
    return <Spinner/>;
  }

  if (!isAuthenticated) {
    return <WelcomePage/>
  }

  const getUserData = async () => {
    const res = await apiRequest('/user-metadata');
    setUserFetchComplete(true);
    if (res.status === 200) {
      const userData = await res.json();
      user.setState({
        ...auth0User,
        ...userData,
      });
    }
  }

  const getToken = async () => {
    const accessToken  = await getAccessTokenSilently();
    setUserToken(jwtDecode(accessToken));
  }

  if (auth0User && !isInitialized && !userFetchComplete && !user.state) {
    getUserData();
  }

  if (auth0User && !isInitialized && !userToken) {
    getToken();
  }

  if (isInitialized) {
    return <App />;
  }

  return <Spinner message="Initializing..." />;
}

export default InitApp;
