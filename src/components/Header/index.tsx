// Hooks
import { useTypedSelector, useUserActions } from '../../hooks';
import { useLocation, useNavigate } from 'react-router-dom';
// Components
import { Link } from 'react-router-dom';
import { Header } from 'antd/es/layout/layout';
import { ConfigProvider, Menu, Input } from 'antd';
import Logo from '../Logo';
import Wrapper from '../Wrapper';
import LoggedInNavItems from '../LoggedInNavItems';
import RegisterItems from '../RegisterItems';
// Themes
import { blackTheme, orangeTheme } from '../../utils/themes';
// Types
import type { MenuInfo } from 'rc-menu/lib/interface';
import { NavigationItemsLabels } from '../../types/enums';
import type { SearchProps } from 'antd/es/input';
// Utils
import { convertToURLAddress } from '../../utils';

const AppHeader: React.FC = () => {
  const { currentUser } = useTypedSelector((state) => (state.user));
  const { emailSignOutStart } = useUserActions();
  const location = useLocation();
  const navigate = useNavigate();

  const { Search } = Input;

  const handleSearch: SearchProps['onSearch'] = (value) => {
    if (value) {
      navigate(`/search?query=${convertToURLAddress(value)}`);
    } else {
      navigate('/search');
    }
  }

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
          <ConfigProvider theme={blackTheme}>
            <Search style={{ width: 304 }} enterButton onSearch={handleSearch} />
          </ConfigProvider>
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