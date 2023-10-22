// Components
import { ConfigProvider, Spin } from 'antd';
import AdminNavItems from '../../components/AdminNavItems';
import ProductsTable from '../../components/ProductsTable';
import Spinner from '../../components/Spinner';
// Hooks
import { useUserActions, useTypedSelector, useProductsActions } from '../../hooks';
import { useEffect } from 'react';
// Styles
import { AdminDashboard, AdminMenu, AdminWrapper } from './Admin.styles';
// Themes
import { orangeTheme } from '../../utils/themes';
// Types
import { AdminItemsLabels } from '../../types/enums';
import type { MenuInfo } from 'rc-menu/lib/interface';

const Admin: React.FC = () => {
  const { currentUser } = useTypedSelector((state) => (state.user));
  const { products } = useTypedSelector((state) => (state.productsData));
  const { isLoading } = useTypedSelector((state) => (state.loader));
  const { emailSignOutStart } = useUserActions();
  const { fetchProductsStart } = useProductsActions();

  const menuSignOutAction = ({ key }: MenuInfo): void => {
    if (key === AdminItemsLabels.SIGN_OUT) emailSignOutStart();
  }

  useEffect(() => {
    fetchProductsStart({
      pageSize: 50,
      filters: {
        currentPage: 1,
      },
    });
  }, [fetchProductsStart]);

  return (
    <AdminWrapper align="flex-start" justify="center">
      <ConfigProvider theme={orangeTheme}>
        <AdminMenu
          disabledOverflow={true}
          mode="vertical"
          items={currentUser ? AdminNavItems(currentUser) : []}
          onClick={menuSignOutAction}
        />
      </ConfigProvider>
      <AdminDashboard vertical align="flex-start" justify="center">
        <Spin indicator={Spinner} spinning={isLoading}>
          <ProductsTable products={products} />
        </Spin>
      </AdminDashboard>
    </AdminWrapper>
  );
};

export default Admin;