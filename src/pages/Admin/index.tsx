// Components
import { ConfigProvider, Spin } from 'antd';
import ProductsTable from '../../components/ProductsTable';
import Spinner from '../../components/Spinner';
// Hooks
import { useUserActions, useTypedSelector, useProductsActions } from '../../hooks';
import { useEffect } from 'react';
// Styles
import { AdminDashboard, AdminDisplayName, AdminMenu, AdminWrapper } from './Admin.styles';
// Themes
import { orangeTheme } from '../../utils/themes';
// Types
import { AdminItemsLabels } from '../../types/enums';
import { UserOutlined } from '@ant-design/icons';
import AddNewProduct from '../../components/AddNewProduct';

const Admin: React.FC = () => {
  const { currentUser } = useTypedSelector((state) => (state.user));
  const { products } = useTypedSelector((state) => (state.productsData));
  const { isLoading } = useTypedSelector((state) => (state.loader));
  const { emailSignOutStart } = useUserActions();
  const { fetchProductsStart } = useProductsActions();

  useEffect(() => {
    fetchProductsStart({
      pageSize: 50,
      filters: {
        currentPage: 1,
      },
    });
  }, [fetchProductsStart]);

  return currentUser
    ? (
      <AdminWrapper align="flex-start" justify="center">
        <ConfigProvider theme={orangeTheme}>
          <AdminMenu
            disabledOverflow={true}
            mode="vertical"
            items={[
              {
                label: (
                  <AdminDisplayName>{currentUser.displayName}</AdminDisplayName>
                ),
                key: AdminItemsLabels.INFO,
                icon: <UserOutlined />,
              },
              {
                label: <AddNewProduct />,
                key: AdminItemsLabels.ADD_NEW_PRODUCT,
              }
            ]}
          />
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