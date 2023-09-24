import { useEffect, useState } from 'react';
import { useProductsActions, useTypedSelector } from '../../hooks';
import { ProductData } from '../../types/interfaces';
import Product from './Product';
import { ConfigProvider, Row, Select } from 'antd';
import { getDocuments } from '../../utils/firebase.utils';
import { orangeTheme } from '../../utils/themes';
import { DefaultOptionType } from 'antd/es/select';
import { FilterFunc } from 'rc-select/lib/Select';

const ProductResults: React.FC = () => {
  const { fetchProductsStart } = useProductsActions();
  const [options, setOptions] = useState<any>([]);
  const { products } = useTypedSelector((state) => (state.productsData));
  const isProductsDataEmpty = !products.data.length;
  
  useEffect(() => {
    fetchProductsStart();
  }, [fetchProductsStart]);

  if (!Array.isArray(products.data)) return null;

  const fetchOptions = async () => {
    try {
      setOptions((await getDocuments('products'))?.docs.map(
        ({ data }) => ({ label: data().category, value: data().category })
      ));
    } catch (err) {
      console.error(err);
    }
  }

  fetchOptions();

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
              .map(({ thumbnail, name, price, documentId }: ProductData, position) => ((
                <Product
                  productConfig={{ thumbnail, name, price }}
                  position={position}
                  key={documentId}
                />
              )))
          }
        </Row>
      }
    </>
  );
}

export default ProductResults;
