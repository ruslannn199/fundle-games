// Hooks
import { useCategoriesActions } from '../../hooks';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
// Components
import { Link } from 'react-router-dom';
import { Header } from 'antd/es/layout/layout';
import { ConfigProvider, Input } from 'antd';
import Logo from '../Logo';
import Wrapper from '../Wrapper';
import NavigationMenu from '../NavigationMenu';
// Themes
import { blackTheme, orangeTheme } from '../../utils/themes';
// Types
import type { SearchProps } from 'antd/es/input';
// Utils
import { convertToURLAddress } from '../../utils';

const AppHeader: React.FC = () => {
  const { updateCategory } = useCategoriesActions();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { Search } = Input;

  const handleSearch: SearchProps['onSearch'] = (value) => {
    if (location.pathname.includes('search')) {
      setSearchParams((searchMap) => {
        if (value) {
          searchMap.set('query', convertToURLAddress(value));
        } else {
          searchMap.delete('query');
        }
        searchMap.set('page', '1');
        return searchMap;
      });
    } else {
      updateCategory('Show all');
      navigate(`/search?page=1${value ? `&query=${convertToURLAddress(value)}` : ''}`);
    }
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
            <NavigationMenu />
          </ConfigProvider>
        </Wrapper>
      </Header>
    )
    : null;
};

export default AppHeader;