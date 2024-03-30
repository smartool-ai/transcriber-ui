import { jwtDecode } from 'jwt-decode';
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

  const isInitialized =
    !!permissions.state
    && !!token.state
    && !!user.state;

  if (isLoading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <WelcomePage />
  }

  const getUserData = async () => {
    const userData = await apiRequest('/user-metadata');
    console.log('------------');
    console.log(userData);
    console.log('------------');
  }

  if (auth0User && !isInitialized) {
    getAccessTokenSilently().then((userToken) => token.setState(jwtDecode(userToken)));
    user.setState(auth0User);
    getUserData();
  }

  if (isInitialized) {
    return <App />;
  }

  return <Spinner message="Initializing..." />;
}

export default InitApp;
