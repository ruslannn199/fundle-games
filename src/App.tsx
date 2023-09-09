// Routes
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Pages
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
// Hooks
import { useEffect } from 'react';
import { useUserActions } from './hooks';
// Hoc
import WithAuth from './hoc/withAuth';
// Components
import { Layout } from 'antd';
import { default as Header } from './components/Header';
// Types
import { NavigationItemsLabels } from './types/enums';
import Dashboard from './pages/Dashboard';

const { Content, Footer } = Layout;

const App: React.FC = () => {
  const { checkUserSession } = useUserActions();

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
  <Router>
    <Layout style={{height: "100%"}}>
      <Header />
      <Content className="content">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path={`/${NavigationItemsLabels.REGISTRATION}`}
            element={<Registration />}
          />
          <Route
            path={`/${NavigationItemsLabels.LOGIN}`}
            element={<Login />}
          />
          <Route
            path="/recovery"
            element={<Recovery />}
          />
          <Route
            path="/dashboard"
            element={<WithAuth><Dashboard /></WithAuth>}
          />
        </Routes>
      </Content>
      <Footer>
        © Ruslan Kamenskiy 2023
      </Footer>
    </Layout>
  </Router>
)};

export default App;
