// Components
import Product from './Product';
import { ConfigProvider, Row, Select } from 'antd';
// Hooks
import { useEffect, useState } from 'react';
import { useProductsActions, useTypedSelector } from '../../hooks';
// Themes
import { orangeTheme } from '../../utils/themes';
// Types
import type { ProductData } from '../../types/interfaces';
import type { DefaultOptionType, SelectProps } from 'antd/es/select';
import type { FilterFunc } from 'rc-select/lib/Select';
// Utils
import { getCategories } from '../../utils';

const ProductResults: React.FC = () => {
  const { fetchProductsStart } = useProductsActions();
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const { products } = useTypedSelector((state) => (state.productsData));
  const isProductsDataEmpty = !products.data.length;
  
  useEffect(() => {
    fetchProductsStart();
  }, [fetchProductsStart]);

  useEffect(() => {
    getCategories()
      .then((categories) => {
        setOptions(categories?.map(({ category }) => ({ label: category, value: category })))
      });
  }, []);

  if (!Array.isArray(products.data)) return null;

  const filterOption: FilterFunc<DefaultOptionType> = (input: string, option?: DefaultOptionType) => {
    return (typeof option?.label === 'string' && (option.label.includes(input)
    || option.label.toLowerCase().includes(input)));
  }

  return (
    <>
      <h1>{isProductsDataEmpty ? 'No search results' : 'Browse products'}</h1>
      <ConfigProvider theme={orangeTheme}>
        <Select
          showSearch
          style={{ width: 300, marginBottom: 32 }}
          placeholder="Choose category"
          filterOption={filterOption}
          filterSort={(optionA, optionB): number => {
            if (typeof optionA.label === 'string' && typeof optionB.label === 'string')
              return optionA.label.toLowerCase().localeCompare((optionB.label).toLowerCase());
            return -1;
          }}
          options={options}
        />
      </ConfigProvider>
      {
        <Row gutter={[0, 32]} align='middle'>
          {
            products
              .data
              .map(({ thumbnail, productName, price, id }: ProductData, position) => ((
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
