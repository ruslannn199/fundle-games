// Hooks
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useCategoriesActions } from '../../hooks';
// Styles
import { BaseHeaderSearch } from './HeaderSearch.styles';
// Types
import type { SearchProps } from 'antd/es/input';
// Utils
import { convertToURLAddress } from '../../utils';

const HeaderSearch: React.FC = () => {
  const { updateCategory } = useCategoriesActions();
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

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
  return (
    <BaseHeaderSearch
      onSearch={handleSearch}
      enterButton
    />
  );
}

export default HeaderSearch;
