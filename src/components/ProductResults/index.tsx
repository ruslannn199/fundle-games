// Components
import Product from './Product';
import { ConfigProvider, Row, Select, Spin } from 'antd';
import Spinner from '../Spinner';
import LoadMoreButton from '../LoadMore';
import Wrapper from '../Wrapper';
// Hooks
import { useEffect, useState } from 'react';
import { useProductsActions, useTypedSelector } from '../../hooks';
import { useSearchParams } from 'react-router-dom';
// Themes
import { blackTheme, orangeTheme } from '../../utils/themes';
// Types
import type { ProductData } from '../../types/interfaces';
import type { DefaultOptionType, SelectProps } from 'antd/es/select';
import type { FilterFunc, SelectHandler } from 'rc-select/lib/Select';
// Utils
import { convertFromURLAddress, convertToURLAddress, getCategories } from '../../utils';

const ProductResults = () => {
  const defaultOptionName = 'Show all';

  const initialOptions: SelectProps['options'] = [{
    label: defaultOptionName,
    value: defaultOptionName,
  }];

  const { fetchProductsStart } = useProductsActions();
  const [options, setOptions] = useState<SelectProps['options']>(initialOptions);
  const { products } = useTypedSelector((state) => (state.productsData));
  const { isLoading } = useTypedSelector((state) => (state.loader));
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedOption, setSelectedOption] = useState<string>(convertFromURLAddress(searchParams.get('category') || ''));

  useEffect(() => {
    if (searchParams.size) {
      const category = convertFromURLAddress(searchParams.get('category') || '');
      const query = convertFromURLAddress(searchParams.get('query') || '');
      if (currentPage > 1) {
        fetchProductsStart({
          persistProducts: products.data,
          currentPage,
          filters: {
            category,
            query,
          },
        });
      } else {
        fetchProductsStart({
          currentPage,
          filters: {
            category,
            query,
          },
        });
      }
    } else {
      fetchProductsStart({ currentPage });
    }
  }, [fetchProductsStart, currentPage, searchParams]);

  useEffect(() => {
    getCategories()
      .then((categories) => {
        if (categories) {
          setOptions(
            initialOptions.concat(
              categories
                .map(({ category }) => ({ label: category, value: category }))
            )
          );
        }
      });
  }, []);

  useEffect(() => {
    setSearchParams((prev) => {
      const query = prev.get('query');
      if (selectedOption) {
        if (query) {
          setCurrentPage(1);
          return {
            ...prev,
            query,
            category: convertToURLAddress(selectedOption),
          };
        }
        return {
          category: convertToURLAddress(selectedOption),
        };
      }
      if (query) {
        setCurrentPage(1);
        return { ...prev, query };
      }
      return '';
    });
  }, [selectedOption, setSearchParams, setCurrentPage]);

  if (!Array.isArray(products.data)) return null;

  const handleLoadingMore = (): void => {
    setCurrentPage(currentPage + 1);
  }

  const handleFilter: SelectHandler<string> = (value): void => {
    setSelectedOption(value === defaultOptionName ? '' : value);
    setCurrentPage(1);
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
    <Spin spinning={isLoading} indicator={Spinner}>
      <h1>{!products.data.length ? "No search results" : "Browse products"}</h1>
      <ConfigProvider theme={orangeTheme}>
        <Select
          showSearch
          style={{ width: 300, marginBottom: 32 }}
          placeholder="Choose category"
          filterOption={filterOption}
          filterSort={filterSort}
          options={options}
          defaultValue={selectedOption || defaultOptionName}
          onSelect={handleFilter}
        />
      </ConfigProvider>
      <Row gutter={[0, 32]} align="middle">
        {
          products
            .data
            .map(({ thumbnail, productName, price, id }: ProductData, position: number) => ((
              <Product
                productConfig={{ thumbnail, productName, price }}
                position={position}
                key={id}
              />
            )))
        }
      </Row>
      <ConfigProvider theme={blackTheme}>
        <Wrapper className="wrapper_flex">
          {products.isLastPage ? null : <LoadMoreButton onLoadMore={handleLoadingMore} />}
        </Wrapper>
      </ConfigProvider>
    </Spin>
  );
}

export default ProductResults;
