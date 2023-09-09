// Hooks
import { useState } from 'react';
import { useTypedSelector, useUserActions } from '../../hooks';
// Router
import { Link } from 'react-router-dom';
// Components
import { Header } from 'antd/es/layout/layout';
import { ConfigProvider, Menu, type MenuProps } from 'antd';
import { orangeTheme } from '../../utils/themes';
import Logo from '../Logo';
import Wrapper from '../Wrapper';
import LoggedInNavItems from '../LoggedInNavItems';
import RegisterItems from '../RegisterItems';
// Types
import { NavigationItemsLabels } from '../../types/enums';

const AppHeader = () => {
  const [, setNavBar] = useState<string[]>([]);
  const { currentUser } = useTypedSelector((state) => (state.user));
  const { emailSignOutStart } = useUserActions();

  const clearActiveNavItem = (): void => (setNavBar((arr) => arr.filter((val) => !val)));

  const changeActiveNavItem: MenuProps['onClick'] = (e): void => {
    switch (e.key) {
      case NavigationItemsLabels.LOGIN:
      case NavigationItemsLabels.REGISTRATION:
        setNavBar([e.key]);
        break;
      default:
        clearActiveNavItem();
    }
  }

  return (
  <Header className="header">
    <Wrapper className="header__wrapper">
      <Link to="/">
        <Logo />
      </Link>
      <ConfigProvider theme={orangeTheme}>
        <Menu
          disabledOverflow={true}
          onClick={changeActiveNavItem}
          mode="horizontal"
          className="nav"
          items={currentUser
            ? LoggedInNavItems(currentUser.displayName, emailSignOutStart)
            : RegisterItems}
        />
      </ConfigProvider>
    </Wrapper>
  </Header>
)};

export default AppHeader;