import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Router, Route } from "wouter";
import useHashLocation from './hooks/useHashLocation';
import Spinner from './components/Spinner';
import Layout from './components/layout/Layout.jsx';
import UploadTranscript from './pages/UploadTranscript';
import DeleteUser from './pages/DeleteUser';
import WelcomePage from './pages/WelcomePage';
import HomePage from './pages/HomePage';
import AddPlatformKeys from './pages/AddPlatformKeys';
import UserSettings from './pages/UserSettings';

export default function App() {
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    user,
    getAccessTokenSilently
  } = useAuth0();

  const [token, setToken] = useState(null);
  const [location] = useHashLocation();

  useEffect(() => {
    if (isAuthenticated && !isLoading && !token) {
      getAccessTokenSilently().then((token) => setToken(jwtDecode(token)));
    }
  }, [isAuthenticated, isLoading, user]);

  const userFirstName = user && user.name.split(" ")[0];

  if (isLoading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <WelcomePage loginWithRedirect={loginWithRedirect} />
  }

  return (
    <Router hook={useHashLocation}>
      <Layout current={location} token={token}>
        <Route path="/">
          <HomePage userFirstName={userFirstName}/>
        </Route>
        <Route path="/upload-transcript" component={UploadTranscript} />
        <Route path="/delete-user" component={DeleteUser} />
        <Route path="/link-platforms" component={AddPlatformKeys} />
        <Route path="/link-platforms" component={AddPlatformKeys} />
        <Route path="/user-settings" component={UserSettings} />
      </Layout>
    </Router>
  )
}
