import { Menu } from 'antd';
import AdminNavItems from '../../components/AdminNavItems';
import { ConfigProvider } from 'antd';
import { orangeTheme } from '../../utils/themes';
import Wrapper from '../../components/Wrapper';
import { AdminItemsLabels } from '../../types/enums';
import { useUserActions, useTypedSelector, useProductsActions } from '../../hooks';
import type { MenuInfo } from 'rc-menu/lib/interface';
import AddNewProduct from '../../components/AddNewProduct';
import { useEffect } from 'react';
import ProductsTable from '../../components/ProductsTable';

const Admin: React.FC = () => {
  const { currentUser } = useTypedSelector((state) => (state.user));
  const { products } = useTypedSelector((state) => (state.productsData));
  const { emailSignOutStart } = useUserActions();
  const { fetchProductsStart } = useProductsActions();

  const menuSignOutAction = ({ key }: MenuInfo): void => {
    if (key === AdminItemsLabels.SIGN_OUT) emailSignOutStart();
  }

  useEffect(() => {
    fetchProductsStart()
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