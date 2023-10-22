// Components
import { Flex, Image } from 'antd';
import AddToCart from '../AddToCart';
// DOMSanitize
import DOMPurify from 'isomorphic-dompurify';
// Hooks
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useProductsActions, useTypedSelector } from '../../hooks';

const ProductCard: React.FC = () => {
  const { productId } = useParams();
  const { fetchProductStart, setProduct } = useProductsActions();
  const { product } = useTypedSelector((state) => (state.productsData));

  useEffect(() => {
    fetchProductStart(productId!);

    return () => { setProduct(null) };
  }, [fetchProductStart, setProduct, productId]);

  if (!product) return null;
  const {
    productName,
    thumbnail,
    price,
    description,
  } = product;

  const cleanDescription = DOMPurify.sanitize(description);

  return (
    <Flex vertical align="center" style={{ padding: "10rem" }}>
      <Flex justify="space-between" gap={10}>
        <Flex vertical>
          <h1>{productName}</h1>
          <Image
            width={400}
            height={400}
            src={thumbnail}
            alt={productName}
          />
        </Flex>
        <Flex vertical style={{ width: "24rem" }} align="flex-end">
          <h4>Цена:</h4>
          <h3>{price}₽</h3>
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

export default ProductCard;
