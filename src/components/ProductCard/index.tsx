// Components
import { Card, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import AddToCart from '../AddToCart';
// Types
import type { ProductData } from '../../types/interfaces';
import { CardImage, ProductCardColumn, ProductCardWrapper } from './ProductCard.styles';
import { useTypedSelector } from '../../hooks';

interface ProductCardProps extends React.RefAttributes<HTMLDivElement> {
  productConfig: ProductData;
  position: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ productConfig }) => {
  const { Meta } = Card;
  const { id, thumbnail, price, productName } = productConfig;
  const { loadingQueue } = useTypedSelector((state) => (state.loader));

  return (thumbnail && productName && typeof price !== 'undefined')
    ? (
      <ProductCardColumn
        lg={{ span: 5, offset: 1 }} md={{ span: 7, offset: 1 }} sm={{ span: 10, offset: 2 }} xs={{ span: 18, offset: 6 }}
      >
        <ProductCardWrapper
          hoverable
          cover={
            <Skeleton loading={Boolean(loadingQueue.length)}>
              {
                loadingQueue.length
                  ? <Skeleton.Image active style={{ height: "6.1138rem" }} />
                  : <CardImage alt={productName} src={thumbnail} />
              }
            </Skeleton>
          }
          actions={[ <AddToCart product={productConfig} /> ]}
        >
          <Skeleton loading={Boolean(loadingQueue.length)} active>
            <Link to={`/products/${id}`} style={{ height: "6.1138rem" }}>
              <Meta title={productName} description={`${price}₽`} />
            </Link>
          </Skeleton>
        </ProductCardWrapper>
      </ProductCardColumn>
    )
    : null
}

export default ProductCard;
