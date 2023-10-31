// Hooks
import { useLocation } from 'react-router-dom';
// Components
import { Link } from 'react-router-dom';
import { ConfigProvider, Flex } from 'antd';
import Logo from '../Logo';
import NavigationMenu from '../NavigationMenu';
import HeaderSearch from '../HeaderSearch';
// Themes
import { blackTheme, orangeTheme } from '../../utils/themes';
// Utils
import { HeaderWrapper, NavigationWrapper } from './Header.styles';
import AdminToolbar from '../AdminToolbar';

const AppHeader: React.FC = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.includes('admin');

  return !isAdminPage
    ? (
      <HeaderWrapper>
        <AdminToolbar />
        <NavigationWrapper>
          <Flex align="center" justify="space-between">
            <Link to="/">
              <Logo />
            </Link>
            <ConfigProvider theme={blackTheme}>
              <HeaderSearch />
            </ConfigProvider>
            <ConfigProvider theme={orangeTheme}>
              <NavigationMenu />
            </ConfigProvider>
          </Flex>
        </NavigationWrapper>
      </HeaderWrapper>
    )
    : null;
};

export default AppHeader;