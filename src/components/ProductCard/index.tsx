// Components
import { Card, Col, Image } from 'antd';
import { Link } from 'react-router-dom';
import AddToCart from '../AddToCart';
// Types
import type { ProductData } from '../../types/interfaces';

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
      <Col
        md={6} sm={8} xs={12}
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Card
          hoverable
          style={{ width: "30rem", position: "relative" }}
          cover={<Image alt={productName} src={thumbnail} />}
          actions={[ <AddToCart product={productConfig} /> ]}
        >
          <Link to={`/products/${id}`} style={{ height: "6.1138rem" }}>
            <Meta title={productName} description={`${price}₽`} />
          </Link>
        </Card>
      </Col>
    );
}

export default ProductCard;
