// Components
import { Layout } from 'antd';
import Header from './components/Header';
import AdminToolbar from './components/AdminToolbar';
// Hooks
import { useEffect } from 'react';
import { useUserActions } from './hooks';
// Hoc
import WithAuth from './hoc/withAuth';
import WithAdminAuth from './hoc/withAdminAuth';
import WithCartItems from './hoc/withCartItems';
// Pages
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import Payment from './pages/Payment';
// Persistor
import { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
// Routes
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Types
import { NavigationItemsLabels } from './types/enums';
import OrderDetails from './pages/OrderDetails';

const { Content, Footer } = Layout;

const App: React.FC = () => {
  const { checkUserSession } = useUserActions();

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <PersistGate persistor={persistor}>
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <AdminToolbar />
          <Header />
          <Content>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/search" element={<Search />} />
              <Route
                path="/products/:productId"
                element={<ProductDetails />}
              />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/payment"
                element={
                  <WithCartItems>
                    <Payment />
                  </WithCartItems>
                }
              />
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
                path="/order/:orderId"
                element={
                  <WithAuth>
                    <OrderDetails />
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
              <Route
                path="/*"
                element={<NotFound />}
              />
            </Routes>
          </Content>
          <Footer>
            © Ruslan Kamenskiy 2023
          </Footer>
        </Layout>
      </Router>
    </PersistGate>
)};

export default App;
