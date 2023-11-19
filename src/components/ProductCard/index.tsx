// Components
import { Card, Flex, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import AddToCart from '../AddToCart';
// Hooks
import { useTypedSelector, useWindowDimensions } from '../../hooks';
// Styles
import { CardImage, ProductCardColumn, ProductCardWrapper } from './ProductCard.styles';
// Types
import type { ProductData } from '../../types/interfaces';

interface ProductCardProps extends React.RefAttributes<HTMLDivElement> {
  productConfig: ProductData;
  position: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ productConfig }) => {
  const { loadingQueue } = useTypedSelector((state) => (state.loader));
  const { width } = useWindowDimensions();
  const { id, thumbnail, price, productName } = productConfig;
  const { Meta } = Card;
  const isMobile = width <= 576;

  const isLoading = !!loadingQueue.length;

  return (thumbnail && productName && typeof price !== 'undefined')
    ? (
      <ProductCardColumn
        lg={{ span: 5, offset: 1 }} md={{ span: 7, offset: 1 }} sm={{ span: 10, offset: 2 }} xs={{ span: 20, offset: 4 }}
      >
        <ProductCardWrapper
          hoverable
          cover={
            isLoading
              ? (
                <Skeleton.Image style={{
                  width: isMobile ? "100%" : "20rem",
                  height: "20rem",
                }} active />
              )
              : (
                <CardImage
                  alt={productName}
                  src={thumbnail}
                  placeholder={<Skeleton.Image style={{
                    width: isMobile ? "100%" : "20rem",
                    height: isMobile ? "20rem" : "20rem",
                  }} />}
                />
              )
          }
          actions={[ <AddToCart product={productConfig} /> ]}
        >
          {
            isLoading
              ? (
                <Flex vertical gap=".8rem">
                  <Skeleton.Input size="small" active />
                  <Skeleton.Input size="small" active />
                </Flex>
              )
              : (
                <Link to={`/products/${id}`} style={{ height: "6.1138rem" }}>
                  <Meta title={productName} description={`${price}₽`} />
                </Link>
              )
          }
        </ProductCardWrapper>
      </ProductCardColumn>
    )
    : null
}

export default ProductCard;
