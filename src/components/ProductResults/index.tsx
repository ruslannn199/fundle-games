// Components
import Product from './Product';
import { ConfigProvider, Row, Select } from 'antd';
// Hooks
import { useEffect, useState } from 'react';
import { useProductsActions, useTypedSelector } from '../../hooks';
import { useSearchParams } from 'react-router-dom';
// Themes
import { orangeTheme } from '../../utils/themes';
// Types
import type { ProductData } from '../../types/interfaces';
import type { DefaultOptionType, SelectProps } from 'antd/es/select';
import type { FilterFunc, SelectHandler } from 'rc-select/lib/Select';
// Utils
import { getCategories } from '../../utils';

const ProductResults: React.FC = () => {
  const initialOptions: SelectProps['options'] = [{
    label: 'Show all',
    value: 'Show all',
  }];

  const { fetchProductsStart } = useProductsActions();
  const [options, setOptions] = useState<SelectProps['options']>(initialOptions);
  const { products } = useTypedSelector((state) => (state.productsData));
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedOption, setSelectedOption] = useState<string>('Show all');
  
  useEffect(() => {
    const isDefaultSelect = selectedOption === 'Show all';
    setSearchParams(
      isDefaultSelect
        ? ''
        : { category: selectedOption.toLowerCase().replaceAll(' ', '-') }
    );
    fetchProductsStart(isDefaultSelect ? '' : selectedOption);
  }, [selectedOption]);

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

  if (!Array.isArray(products.data)) return null;

  const handleFilter: SelectHandler<string> = (value) => {
    setSelectedOption(value);
  }

  const filterOption: FilterFunc<DefaultOptionType> = (input: string, option?: DefaultOptionType) => {
    return (typeof option?.label === 'string' && (option.label.includes(input)
    || option.label.toLowerCase().includes(input)));
  }

  return (
    <>
      <h1>{!products.data.length ? 'No search results' : 'Browse products'}</h1>
      <ConfigProvider theme={orangeTheme}>
        <Select
          showSearch
          style={{ width: 300, marginBottom: 32 }}
          placeholder="Choose category"
          filterOption={filterOption}
          filterSort={(optionA, optionB): number => {
            if (optionA.label === 'Show all')
              return -1;
            if (optionB.label === 'Show all')
              return 1;
            if (typeof optionA.label === 'string' && typeof optionB.label === 'string')
              return optionA.label.toLowerCase().localeCompare((optionB.label).toLowerCase());
            return -1;
          }}
          options={options}
          defaultValue="Show all"
          onSelect={handleFilter}
        />
      </ConfigProvider>
      {
        <Row gutter={[0, 32]} align='middle'>
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
      }
    </>
  );
}

export default ProductResults;
