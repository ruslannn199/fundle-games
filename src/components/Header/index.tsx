// Hooks
import { useCategoriesActions } from '../../hooks';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
// Components
import { Link } from 'react-router-dom';
import { ConfigProvider, Flex, Input } from 'antd';
import Logo from '../Logo';
import NavigationMenuWrapper from '../NavigationMenu';
// Themes
import { blackTheme, orangeTheme } from '../../utils/themes';
// Types
import type { SearchProps } from 'antd/es/input';
// Utils
import { convertToURLAddress } from '../../utils';
import { HeaderWrapper } from './Header.styles';

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
      <HeaderWrapper>
        <Flex align="center" justify="space-between">
          <Link to="/">
            <Logo />
          </Link>
          <ConfigProvider theme={blackTheme}>
            <Search style={{ width: "46rem" }} enterButton onSearch={handleSearch} />
          </ConfigProvider>
          <ConfigProvider theme={orangeTheme}>
            <NavigationMenuWrapper />
          </ConfigProvider>
        </Flex>
      </HeaderWrapper>
    )
    : null;
};

export default AppHeader;