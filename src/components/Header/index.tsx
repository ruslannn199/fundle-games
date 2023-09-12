// Hooks
import { useTypedSelector, useUserActions } from '../../hooks';
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

const AppHeader = () => {
  const { currentUser } = useTypedSelector((state) => (state.user));
  const { emailSignOutStart } = useUserActions();

  return (
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
            ? LoggedInNavItems(currentUser, emailSignOutStart)
            : RegisterItems}
        />
      </ConfigProvider>
    </Wrapper>
  </Header>
)};

export default AppHeader;