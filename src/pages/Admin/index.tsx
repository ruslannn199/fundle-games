import { Menu } from 'antd';
import AdminNavItems from '../../components/AdminNavItems';
import { ConfigProvider } from 'antd';
import { orangeTheme } from '../../utils/themes';
import Wrapper from '../../components/Wrapper';
import { AdminItemsLabels } from '../../types/enums';
import { useUserActions, useTypedSelector } from '../../hooks';
import type { MenuInfo } from 'rc-menu/lib/interface';
import AddNewProduct from '../../components/AddNewProduct';

const Admin: React.FC = () => {
  const { currentUser } = useTypedSelector((state) => (state.user));
  const { emailSignOutStart } = useUserActions();

  const menuSignOutAction = ({ key }: MenuInfo): void => {
    if (key === AdminItemsLabels.SIGN_OUT) emailSignOutStart();
  }

  return (
    <Wrapper className="admin__wrapper">
      <ConfigProvider theme={orangeTheme}>
        <Menu
          disabledOverflow={true}
          mode="vertical"
          className="admin__menu"
          defaultSelectedKeys={[AdminItemsLabels.INFO]}
          items={currentUser ? AdminNavItems(currentUser) : []}
          onClick={menuSignOutAction}
        />
      </ConfigProvider>
      <div className="admin__dashboard">
        <AddNewProduct />
      </div>
    </Wrapper>
  );
};

export default Admin;