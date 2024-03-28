import {Router} from "wouter";
import useHashLocation from '../hooks/useHashLocation';
import Layout from '../components/layout/Layout.jsx';
import Routes from "./Routes.jsx";

const App = () => {
  return (
    <Router hook={useHashLocation}>
      <Layout current={location}>
        <Routes />
      </Layout>
    </Router>
  )
}

export default App;
