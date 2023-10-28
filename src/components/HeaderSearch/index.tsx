import { SearchProps } from 'antd/es/input';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { convertToURLAddress } from '../../utils';
import { useCategoriesActions } from '../../hooks';
import { BaseHeaderSearch } from './HeaderSearch.styles';

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
