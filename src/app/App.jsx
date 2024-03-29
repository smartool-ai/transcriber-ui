import {Router} from "wouter";
import useHashLocation from '../hooks/useHashLocation';
import Layout from '../layout/Layout.jsx';
import Routes from "./Routes.jsx";

const App = () => {
  const [location] = useHashLocation();

  return (
    <Router hook={useHashLocation}>
      <Layout current={location}>
        <Routes />
      </Layout>
    </Router>
  )
}

export default App;
