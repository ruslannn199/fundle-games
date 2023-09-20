import { useEffect } from 'react';
import { useProductsActions, useTypedSelector } from '../../hooks';
import { ProductData } from '../../types/interfaces';
import Product from './Product';
import { Row } from 'antd';

const ProductResults: React.FC = () => {
  const { fetchProductsStart } = useProductsActions();
  const { products } = useTypedSelector((state) => (state.productsData));
  const isProductsDataEmpty = !products.data.length;
  
  useEffect(() => {
    fetchProductsStart();
  }, [fetchProductsStart]);

  if (!Array.isArray(products.data)) return null;

  return (
    <>
      <h1>{isProductsDataEmpty ? 'No search results' : 'Browse products'}</h1>
      {
        <Row gutter={[, 32]} justify='center' align='middle'>
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
