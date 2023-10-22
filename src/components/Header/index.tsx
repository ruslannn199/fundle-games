// Hooks
import { useLocation } from 'react-router-dom';
// Components
import { Link } from 'react-router-dom';
import { ConfigProvider, Flex } from 'antd';
import Logo from '../Logo';
// Themes
import { blackTheme, orangeTheme } from '../../utils/themes';
// Utils
import { HeaderWrapper } from './Header.styles';
import NavigationMenu from '../NavigationMenu';
import HeaderSearch from '../HeaderSearch';

const AppHeader: React.FC = () => {
  const location = useLocation();

  return !location.pathname.includes('admin')
    ? (
      <HeaderWrapper>
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
      </HeaderWrapper>
    )
    : null;
};

export default AppHeader;