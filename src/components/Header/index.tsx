// Hooks
import { useTypedSelector, useUserActions } from '../../hooks';
import { useLocation } from 'react-router-dom';
// Router
import { Link } from 'react-router-dom';
// Components
import { Header } from 'antd/es/layout/layout';
import { ConfigProvider, Menu } from 'antd';
import { orangeTheme } from '../../utils/themes';
import Logo from '../Logo';
import Wrapper from '../Wrapper';
import LoggedInNavItems from '../LoggedInNavItems';
import RegisterItems from '../RegisterItems';
// Types
import type { MenuInfo } from 'rc-menu/lib/interface';
import { NavigationItemsLabels } from '../../types/enums';

const AppHeader: React.FC = () => {
  const { currentUser } = useTypedSelector((state) => (state.user));
  const { emailSignOutStart } = useUserActions();
  const location = useLocation();

  const menuSignOutAction = ({ key }: MenuInfo): void => {
    if (key === NavigationItemsLabels.LOG_OUT) emailSignOutStart();
  }

  return !location.pathname.includes('admin')
    ? (
      <Header className="header">
        <Wrapper className="header__wrapper">
          <Link to="/">
            <Logo />
          </Link>
          <ConfigProvider theme={orangeTheme}>
            <Menu
              disabledOverflow={true}
              mode="horizontal"
              className="nav"
              items={currentUser
                ? LoggedInNavItems(currentUser)
                : RegisterItems}
              onClick={menuSignOutAction}
            />
          </ConfigProvider>
        </Wrapper>
      </Header>
    )
    : null;
};

export default AppHeader;