// Components
import { Menu, ConfigProvider } from 'antd';
import AdminNavItems from '../../components/AdminNavItems';
import Wrapper from '../../components/Wrapper';
import AddNewProduct from '../../components/AddNewProduct';
import ProductsTable from '../../components/ProductsTable';
// Hooks
import { useUserActions, useTypedSelector, useProductsActions } from '../../hooks';
import { useEffect } from 'react';
// Themes
import { orangeTheme } from '../../utils/themes';
// Types
import { AdminItemsLabels } from '../../types/enums';
import type { MenuInfo } from 'rc-menu/lib/interface';

const Admin: React.FC = () => {
  const { currentUser } = useTypedSelector((state) => (state.user));
  const { products } = useTypedSelector((state) => (state.productsData));
  const { emailSignOutStart } = useUserActions();
  const { fetchProductsStart } = useProductsActions();

  const menuSignOutAction = ({ key }: MenuInfo): void => {
    if (key === AdminItemsLabels.SIGN_OUT) emailSignOutStart();
  }

  useEffect(() => {
    fetchProductsStart('');
  }, [fetchProductsStart]);

  return (
    <Wrapper className="admin__wrapper">
      <ConfigProvider theme={orangeTheme}>
        <Menu
          disabledOverflow={true}
          mode="vertical"
          className="admin__menu"
          items={currentUser ? AdminNavItems(currentUser) : []}
          onClick={menuSignOutAction}
        />
      </ConfigProvider>
      <div className="admin__dashboard">
        <AddNewProduct />
        <ProductsTable products={products} />
      </div>
    </Wrapper>
  );
};

export default Admin;