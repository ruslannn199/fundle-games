// Components
import { ConfigProvider, FloatButton, Spin } from 'antd';
import ProductsTable from '../../components/ProductsTable';
import Spinner from '../../components/Spinner';
import AddNewProduct from '../../components/AddNewProduct';
// Hooks
import { useTypedSelector, useProductsActions } from '../../hooks';
import { useEffect } from 'react';
// Styles
import { AdminDashboard, AdminWrapper } from './Admin.styles';
// Themes
import { orangeTheme } from '../../utils/themes';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const Admin: React.FC = () => {
  const { currentUser } = useTypedSelector((state) => (state.user));
  const { products } = useTypedSelector((state) => (state.productsData));
  const { isLoading } = useTypedSelector((state) => (state.loader));
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
            <FloatButton icon={<HomeOutlined />} onClick={goHome} tooltip="На главную" />
            <AddNewProduct float />
          </FloatButton.Group>
        </ConfigProvider>
        <AdminDashboard vertical align="flex-start" justify="center">
          <Spin indicator={Spinner} spinning={isLoading}>
            <ProductsTable products={products} />
          </Spin>
        </AdminDashboard>
      </AdminWrapper>
    )
    : null;
};

export default Admin;