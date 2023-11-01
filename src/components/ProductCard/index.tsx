// Components
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import AddToCart from '../AddToCart';
// Types
import type { ProductData } from '../../types/interfaces';
import { CardImage, ProductCardColumn, ProductCardWrapper } from './ProductCard.styles';

interface ProductCardProps extends React.RefAttributes<HTMLDivElement> {
  productConfig: ProductData;
  position: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ productConfig }) => {
  const { Meta } = Card;
  const { id, thumbnail, price, productName } = productConfig;

  return (thumbnail && productName && typeof price !== 'undefined')
    ? (
      <ProductCardColumn
        lg={{ span: 5, offset: 1 }} md={{ span: 7, offset: 1 }} sm={{ span: 10, offset: 2 }} xs={{ span: 18, offset: 6 }}
      >
        <ProductCardWrapper
          hoverable
          cover={<CardImage alt={productName} src={thumbnail} />}
          actions={[ <AddToCart product={productConfig} /> ]}
        >
          <Link to={`/products/${id}`} style={{ height: "6.1138rem" }}>
            <Meta title={productName} description={`${price}₽`} />
          </Link>
        </ProductCardWrapper>
      </ProductCardColumn>
    )
    : null
}

export default ProductCard;
