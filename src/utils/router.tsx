// Pages
import Layout from '../pages/Layout';
import ErrorPage from '../pages/ErrorPage';
// Routing
import { createBrowserRouter } from 'react-router-dom';
// Types
import { NavigationItemsLabels } from '../types/enums';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        lazy: async () => {
          const Homepage = (await import('../pages/Homepage')).default;
          return { Component: Homepage };
        },
      },
      {
        path: 'search',
        lazy: async () => {
          const Search = (await import('../pages/Search')).default;
          return { Component: Search };
        },
      },
      {
        path: 'products/:productId',
        lazy: async () => {
          const ProductDetails = (await import('../pages/ProductDetails')).default;
          return { Component: ProductDetails };
        },
      },
      {
        path: 'cart',
        lazy: async () => {
          const Cart = (await import('../pages/Cart')).default;
          return { Component: Cart };
        },
      },
      {
        path: 'payment',
        lazy: async() => {
          const Payment = (await import('../pages/Payment')).default;
          return { Component: Payment };
        },
      },
      {
        path: `${NavigationItemsLabels.REGISTRATION}`,
        lazy: async () => {
          const Registration = (await import('../pages/Registration')).default;
          return { Component: Registration };
        },
      },
      {
        path: `${NavigationItemsLabels.LOGIN}`,
        lazy: async () => {
          const Login = (await import('../pages/Login')).default;
          return { Component: Login };
        },
      },
      {
        path: 'recovery',
        lazy: async () => {
          const Recovery = (await import('../pages/Recovery')).default;
          return { Component: Recovery };
        },
      },
      {
        path: 'dashboard',
        lazy: async () => {
          const Dashboard = (await import('../pages/Dashboard')).default;
          return { Component: Dashboard };
        }
      },
      {
        path: 'order/:orderId',
        lazy: async () => {
          const OrderList = (await import('../pages/OrderList')).default;
          return { Component: OrderList };
        }
      },
      {
        path: 'admin',
        lazy: async () => {
          const Admin = (await import('../pages/Admin')).default;
          return { Component: Admin };
        }
      },
      {
        path: 'error',
        lazy: async () => {
          const ErrorPage = (await import('../pages/ErrorPage')).default;
          return { Component: ErrorPage };
        },
      },
      {
        path: 'success',
        lazy: async () => {
          const Success = (await import('../pages/Success')).default;
          return { Component: Success };
        },
      },
      {
        path: '*',
        lazy: async () => {
          const NotFound = (await import('../pages/NotFound')).default;
          return { Component: NotFound };
        },
      },
    ]
  }
]);