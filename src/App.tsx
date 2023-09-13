// Routes
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Pages
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
// Hooks
import { useEffect } from 'react';
import { useUserActions } from './hooks';
// Hoc
import WithAuth from './hoc/withAuth';
import WithAdminAuth from './hoc/withAdminAuth';
// Components
import { Layout } from 'antd';
import Header from './components/Header';
import AdminToolbar from './components/AdminToolbar';
// Types
import { NavigationItemsLabels } from './types/enums';

const { Content, Footer } = Layout;

const App: React.FC = () => {
  const { checkUserSession } = useUserActions();

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
  <Router>
    <Layout style={{height: "100%"}}>
      <AdminToolbar />
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
            element={
            <WithAuth>
              <Dashboard />
            </WithAuth>
            }
          />
          <Route
            path="/admin"
            element={
            <WithAdminAuth>
              <Admin />
            </WithAdminAuth>
            }
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
