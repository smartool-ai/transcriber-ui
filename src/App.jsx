import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {Router, Route} from "wouter";
import useHashLocation from './hooks/useHashLocation';
import Spinner from './components/Spinner';
import Layout from './components/layout/Layout.jsx';
import UploadTranscript from './pages/UploadTranscript';
import DeleteUser from './pages/DeleteUser';
import WelcomePage from './pages/WelcomePage';
import HomePage from './pages/HomePage';
import LinkPlatforms from "./pages/settings/LinkPlatforms/LinkPlatforms.jsx";
import UserSettings from './pages/settings/UserSettings/UserSettings.jsx';
import {useUserContext} from "./context/UserContext.jsx";

export default function App() {
  const {
    isAuthenticated,
    isLoading,
    user,
    getAccessTokenSilently
  } = useAuth0();

  const [token, setToken] = useState(null);
  const [location] = useHashLocation();
  const { firstName, fullName } = useUserContext();

  useEffect(() => {
    if (isAuthenticated && !isLoading && !token) {
      getAccessTokenSilently().then((token) => setToken(jwtDecode(token)));
    }
  }, [isAuthenticated, isLoading, user]);

  if (user) {
    firstName.setState(user.name.split(" ")[0]);
    fullName.setState(user.name);
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <WelcomePage />
  }

  return (
    <Router hook={useHashLocation}>
      <Layout current={location} token={token}>
        <Route path="/" component={HomePage} />
        <Route path="/upload-transcript" component={UploadTranscript} />
        <Route path="/delete-user" component={DeleteUser} />
        <Route path="/settings/link-platforms" component={LinkPlatforms} />
        <Route path="/settings/user-settings" component={UserSettings} />
      </Layout>
    </Router>
  )
}
