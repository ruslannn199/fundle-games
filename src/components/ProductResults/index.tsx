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

  const colsPerRow = 4;
  const rowsAmount = Math.ceil(products.data.length / colsPerRow);
  const productResultArr: JSX.Element[] = [...new Array(rowsAmount)];

  const productResultsCols = products.data.map(({ thumbnail, name, price, documentId }: ProductData, position) => {
    return (
      <Product
        productConfig={{ thumbnail, name, price }}
        position={position}
        key={documentId}
      />);
  });

  return (
    <>
      <h1>{isProductsDataEmpty ? 'No search results' : 'Browse products'}</h1>
      {productResultArr.map((el, i) => (
        <Row style={{ marginBottom: 32 }} key={i}>
          {productResultsCols.slice(i * colsPerRow, (i * colsPerRow) + colsPerRow)}
        </Row>
      ))}
    </>
  );
}

export default ProductResults;
