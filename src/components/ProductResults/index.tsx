// Components
import ProductCard from '../ProductCard';
import { ConfigProvider, Flex } from 'antd';
import LoadMoreButton from '../LoadMore';
import { ProductCardRow, ProductResultsSelect, ProductResultsWrapper } from './ProductResults.styles';
// Hooks
import { useEffect, useMemo } from 'react';
import { useProductsActions, useTypedSelector } from '../../hooks';
import { useSearchParams } from 'react-router-dom';
import { useCategoriesActions } from '../../hooks/useActions';
// Themes
import { blackTheme, orangeTheme } from '../../utils/themes';
// Types
import type { ProductData } from '../../types/interfaces';
import type { DefaultOptionType, SelectProps } from 'antd/es/select';
import type { FilterFunc, SelectHandler } from 'rc-select/lib/Select';
// Utils
import { convertFromURLAddress, convertToURLAddress } from '../../utils';

const ProductResults: React.FC = () => {
  const defaultOptionName = 'Show all';

  const { fetchProductsStart } = useProductsActions();
  const { fetchCategoriesStart } = useCategoriesActions();
  const { categories, category } = useTypedSelector((state) => (state.category));
  const { products } = useTypedSelector((state) => (state.productsData));
  const [searchParams, setSearchParams] = useSearchParams();

  const options: SelectProps['options'] = useMemo(() => (
    categories.map(({ category }) => ({ label: category, value: category }))
  ), [categories]);

  const filters = useMemo(() => ({
    currentPage: parseInt(convertFromURLAddress(searchParams.get('page') || '1'), 10),
    category: convertFromURLAddress(searchParams.get('category') || ''),
    query: convertFromURLAddress(searchParams.get('query') || ''),
  }), [searchParams]);

  useEffect(() => {
    const persistProducts = filters.currentPage > 1 ? products.data : [];
    fetchProductsStart({
      persistProducts,
      filters,
    });
  }, [fetchProductsStart, filters]);

  useEffect(() => {
    fetchCategoriesStart();
  }, [fetchCategoriesStart]);

  if (!Array.isArray(products.data)) return null;

  const increasePage = () => {
    const currentPage = parseInt(convertFromURLAddress(searchParams.get('page') || ''), 10);
    setSearchParams((searchMap) => {
      searchMap.set('page', `${currentPage + 1}`);
      return searchMap;
    });
  }

  const handleFilter: SelectHandler<string> = (value): void => {
    setSearchParams((searchMap) => {
      if (value !== defaultOptionName) {
        searchMap.set('category', convertToURLAddress(value));
      } else {
        searchMap.delete('category');
      }
      searchMap.set('page', '1');
      return searchMap;
    });
  }

  const filterOption: FilterFunc<DefaultOptionType> = (input: string, option?: DefaultOptionType) => (
    (typeof option?.label === 'string' && (option.label.includes(input)
    || option.label.toLowerCase().includes(input)))
  )

  const filterSort = (optionA: DefaultOptionType, optionB: DefaultOptionType): number => {
    if (optionA.label === defaultOptionName)
      return -1;
    if (optionB.label === defaultOptionName)
      return 1;
    if (typeof optionA.label === 'string' && typeof optionB.label === 'string')
      return optionA.label.toLowerCase().localeCompare((optionB.label).toLowerCase());
    return -1;
  }

  return (
    <ProductResultsWrapper vertical>
      <h1>{!products.data.length ? "Нет результатов" : "Поиск по товарам"}</h1>
      <ConfigProvider theme={orangeTheme}>
        <ProductResultsSelect
          showSearch
          placeholder="Choose category"
          filterOption={filterOption}
          filterSort={filterSort}
          options={options}
          defaultValue={category}
          onSelect={handleFilter}
        />
      </ConfigProvider>
      <ProductCardRow gutter={[0, 32]}>
        {
          products
            .data
            .map((product: ProductData, position: number) => ((
              <ProductCard
                productConfig={product}
                position={position}
                key={product.id}
              />
            )))
        }
      </ProductCardRow>
      <ConfigProvider theme={blackTheme}>
        <Flex align="center" justify="center">
          {products.isLastPage ? null : <LoadMoreButton onLoadMore={ () => increasePage() } />}
        </Flex>
      </ConfigProvider>
    </ProductResultsWrapper>
  );
}

export default ProductResults;
