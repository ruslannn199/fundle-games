// Components
import AddNewProduct from '../../components/AddNewProduct';
import { ConfigProvider, FloatButton } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import ProductsTable from '../../components/ProductsTable';
// Hooks
import { useTypedSelector, useProductsActions, useAdminAuth } from '../../hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Styles
import { AdminDashboard, AdminWrapper } from './Admin.styles';
// Themes
import { orangeTheme } from '../../utils/themes';

const Admin: React.FC = () => {
  useAdminAuth();
  const { currentUser } = useTypedSelector((state) => (state.user));
  const { products } = useTypedSelector((state) => (state.productsData));
  const { fetchProductsStart } = useProductsActions();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductsStart({
      pageSize: 50,
      filters: {
        currentPage: 1,
      },
    });
  }, [fetchProductsStart]);

  const goHome = () => {
    navigate('/');
  }

  return currentUser
    ? (
      <AdminWrapper align="flex-start" justify="center">
        <ConfigProvider theme={orangeTheme}>
          <FloatButton.Group>
            <FloatButton.BackTop visibilityHeight={1200} tooltip="Наверх" />
            <FloatButton icon={<HomeOutlined />} onClick={goHome} tooltip="На главную" />
            <AddNewProduct float />
          </FloatButton.Group>
        </ConfigProvider>
        <AdminDashboard vertical align="flex-start" justify="center">
          {/* <Spinner spinning={isLoading}> */}
            <ProductsTable products={products} />
          {/* </Spinner> */}
        </AdminDashboard>
      </AdminWrapper>
    )
    : null;
};

export default Admin;