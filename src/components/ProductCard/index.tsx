// Hooks
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useProductsActions, useTypedSelector } from '../../hooks';
import { Flex, Image } from 'antd';
import AddToCart from '../AddToCart';

const ProductCard: React.FC = () => {
  const { productId } = useParams();
  const { fetchProductStart, setProduct } = useProductsActions();
  const { product } = useTypedSelector((state) => (state.productsData));

  useEffect(() => {
    fetchProductStart(productId!);

    return () => { setProduct(null); }
  }, [fetchProductStart]);

  if (!product) return null;
  const {
    productName,
    thumbnail,
    price,
    description,
  } = product;

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
        <Flex vertical style={{ width: 240 }} align="flex-end">
          <h4>Цена:</h4>
          <h3>{price}₽</h3>
          <AddToCart />
        </Flex>
      </Flex>
      <p>{description}</p>
    </Flex>
  );
}

export default ProductCard;
