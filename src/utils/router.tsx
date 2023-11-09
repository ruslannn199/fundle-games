// HOC
import WithAdminAuth from '../hoc/withAdminAuth';
import WithAuth from '../hoc/withAuth';
import WithCartItems from '../hoc/withCartItems';
import Layout from '../pages/Layout';
// // Pages
// import Homepage from '../pages/Homepage';
// import Search from '../pages/Search';
// import ProductDetails from '../pages/ProductDetails';
// import Cart from '../pages/Cart';
// import Payment from '../pages/Payment';
// import Registration from '../pages/Registration';
// import Login from '../pages/Login';
// import Recovery from '../pages/Recovery';
// import Dashboard from '../pages/Dashboard';
// import OrdersList from '../pages/OrderList';
// import Admin from '../pages/Admin';
// import NotFound from '../pages/NotFound';
// Router
import { createBrowserRouter } from 'react-router-dom';
// Types
import { NavigationItemsLabels } from '../types/enums';
import { Suspense, lazy } from 'react';
import Spinner from '../components/Spinner';

const Homepage = lazy(() => import('../pages/Homepage'));
const Search = lazy(() => import('../pages/Search'));
const ProductDetails = lazy(() => import('../pages/ProductDetails'));
const Cart = lazy(() => import('../pages/Cart'));
const Payment = lazy(() => import('../pages/Payment'));
const Registration = lazy(() => import('../pages/Registration'));
const Login = lazy(() => import('../pages/Login'));
const Recovery = lazy(() => import('../pages/Recovery'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const OrdersList = lazy(() => import('../pages/OrderList'));
const Admin = lazy(() => import('../pages/Admin'));
const NotFound = lazy(() => import('../pages/NotFound'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
    { path: '', element: <Homepage /> },
    { path: 'search', element: <Search /> },
    { path: 'products/:productId', element: <ProductDetails /> },
    { path: 'cart', element: <Cart /> },
    { path: 'payment', element: <WithCartItems><Payment /></WithCartItems> },
    { path: `${NavigationItemsLabels.REGISTRATION}`, element: <Registration /> },
    { path: `${NavigationItemsLabels.LOGIN}`, element: <Login /> },
    { path: 'recovery', element: <Recovery /> },
    { path: 'dashboard', element: <WithAuth><Dashboard /></WithAuth> },
    { path: 'order/:orderId', element: <WithAuth><OrdersList /></WithAuth> },
    { path: 'admin', element: <WithAdminAuth><Admin /></WithAdminAuth> },
    { path: '*', element: <NotFound /> }
    ]
  }
]);