// Components
import { LayoutWrapper } from './Layout.styles';
import Header from '../../components/Header';
import NavigationMenuMobile from '../../components/NavigationMenuMobile';
// Hoc
import WithAuth from '../../hoc/withAuth';
import WithAdminAuth from '../../hoc/withAdminAuth';
import WithCartItems from '../../hoc/withCartItems';
// Pages
import Homepage from '../../pages/Homepage';
import Registration from '../../pages/Registration';
import Login from '../../pages/Login';
import Recovery from '../../pages/Recovery';
import Dashboard from '../../pages/Dashboard';
import Admin from '../../pages/Admin';
import Search from '../../pages/Search';
import ProductDetails from '../../pages/ProductDetails';
import Cart from '../../pages/Cart';
import NotFound from '../../pages/NotFound';
import Payment from '../../pages/Payment';
import OrdersList from '../../pages/OrderList';
// Routes
import { Routes, Route } from 'react-router-dom';
// Types
import { NavigationItemsLabels } from '../../types/enums';

const AppLayout: React.FC = () => {
  const { Content, Footer } = LayoutWrapper;

  return (
    <LayoutWrapper>
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
                <OrdersList />
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
      <NavigationMenuMobile />
    </LayoutWrapper>
  );
}

export default AppLayout;
