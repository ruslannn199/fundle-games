// Components
import ProductResults from '../../components/ProductResults';
import SearchWrapper from './Search.styles';

const Search: React.FC = () => {
  return (
    <SearchWrapper justify="center">
      <ProductResults />
    </SearchWrapper>
  );
}

export default Search;
