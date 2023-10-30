// Components
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import AddToCart from '../AddToCart';
// Types
import type { ProductData } from '../../types/interfaces';
import { CardImage, ProductCardColumn, ProductCardWrapper } from './ProductCard.styles';

interface ProductElementProps extends React.RefAttributes<HTMLDivElement> {
  productConfig: ProductData;
  position: number;
}

const ProductCard: React.FC<ProductElementProps> = ({ productConfig }) => {
  const { Meta } = Card;
  const { thumbnail, price, productName, id } = productConfig;

  return (!(thumbnail || productName || typeof price !== 'undefined'))
    ? null
    : (
      <ProductCardColumn
        lg={6} md={8} sm={12} xs={24}
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
    );
}

export default ProductCard;
