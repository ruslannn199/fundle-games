// Components
import { Flex, Image } from 'antd';
import AddToCart from '../AddToCart';
// DOMSanitize
import DOMPurify from 'isomorphic-dompurify';
// Hooks
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useProductsActions, useTypedSelector } from '../../hooks';

const Product: React.FC = () => {
  const { productId } = useParams();
  const { fetchProductStart, setProduct } = useProductsActions();
  const { product } = useTypedSelector((state) => (state.productsData));

  useEffect(() => {
    if (productId) {
      fetchProductStart(productId);
    }
    return () => { setProduct(null) };
  }, [fetchProductStart, productId]);

  if (!product) return null;

  const cleanDescription = DOMPurify.sanitize(product.description);

  return (
    <Flex vertical align="center" style={{ padding: "10rem" }}>
      <Flex justify="space-between" gap={10}>
        <Flex vertical>
          <h1>{product.productName}</h1>
          <Image
            width={400}
            height={400}
            src={product.thumbnail}
            alt={product.productName}
          />
        </Flex>
        <Flex vertical style={{ width: "24rem" }} align="flex-end">
          <h4>Цена:</h4>
          <h3>{product.price}₽</h3>
          <AddToCart product={product} />
        </Flex>
      </Flex>
      <div
        style={{ alignSelf: "flex-start" }}
        dangerouslySetInnerHTML={{ __html: cleanDescription }}
      />
    </Flex>
  );
}

export default Product;
