import { Header } from 'antd/es/layout/layout';
import { ConfigProvider, Menu, type MenuProps } from 'antd';
import { NavigationItemsLabels } from '../../types/enums';
import { orangeTheme } from '../../utils/themes';
import { Link } from 'react-router-dom';
import Wrapper from '../Wrapper';
import Logo from '../Logo';
import { useState } from 'react';
import LoggedInNavItems from '../LoggedInNavItems';
import RegisterItems from '../RegisterItems';
import type { User } from 'firebase/auth';
import { connect } from 'react-redux';

const AppHeader = ({ currentUser }: Record<'currentUser', User | undefined>) => {
  const [navBar, setNavBar] = useState<string[]>([]);

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
          selectedKeys={currentUser && navBar}
          mode="horizontal"
          items={currentUser
            ? LoggedInNavItems({ photo: currentUser.photoURL, name: currentUser.displayName})
            : RegisterItems}
        />
      </ConfigProvider>
    </Wrapper>
  </Header>
)};
// @ts-ignore
const mapStateToProps = (props) => {
  console.log(props);
  return {
    currentUser: props.user.currentUser
  }
};

export default connect(mapStateToProps, null)(AppHeader);