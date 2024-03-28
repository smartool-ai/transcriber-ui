import { jwtDecode } from 'jwt-decode';
import { useAuth0 } from '@auth0/auth0-react';
import Spinner from '../components/Spinner';
import WelcomePage from '../pages/WelcomePage';
import {useUserContext} from "../context/UserContext.jsx";

const InitApp = ({ children }) => {
  const {
    isAuthenticated,
    isLoading,
    user: auth0User,
    getAccessTokenSilently
  } = useAuth0();

  const { token, user } = useUserContext();

  const isInitialized = !!user.state && !!token.state;

  if (isLoading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <WelcomePage />
  }

  if (auth0User && !isInitialized) {
    getAccessTokenSilently().then((userToken) => token.setState(jwtDecode(userToken)));
    user.setState(auth0User);
  }

  if (isInitialized) {
    return <Spinner message="I did it "/>;
  }

  return <Spinner message="Initializing..." />;
}

export default InitApp;
