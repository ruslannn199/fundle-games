// Hooks
import { useLocation } from 'react-router-dom';
// Components
import { Link } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Logo from '../Logo';
import NavigationMenu from '../NavigationMenu';
import HeaderSearch from '../HeaderSearch';
import AdminToolbar from '../AdminToolbar';
// Styles
import { HeaderWrapper, NavigationWrapper } from './Header.styles';
// Themes
import { blackTheme, orangeTheme } from '../../utils/themes';

const AppHeader: React.FC = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.includes('admin');

  return !isAdminPage
    ? (
      <HeaderWrapper>
        <AdminToolbar />
        <NavigationWrapper>
          <Link to="/">
            <Logo />
          </Link>
          <ConfigProvider theme={blackTheme}>
            <HeaderSearch />
          </ConfigProvider>
          <ConfigProvider theme={orangeTheme}>
            <NavigationMenu />
          </ConfigProvider>
        </NavigationWrapper>
      </HeaderWrapper>
    )
    : null;
};

export default AppHeader;