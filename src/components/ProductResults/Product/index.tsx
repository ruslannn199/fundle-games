// Components
import { Card, Col, Image } from 'antd';
// Types
import type { ProductData } from '../../../types/interfaces';
import { Link } from 'react-router-dom';
import AddToCart from '../../AddToCart';

type ProductElementPropsFromData = Record<'productConfig', Pick<ProductData, 'thumbnail' | 'price' | 'productName' | 'id'>>;

interface ProductElementProps extends ProductElementPropsFromData {
  position: number;
}

const Product: React.FC<ProductElementProps> = ({ productConfig: { thumbnail, price, productName, id } }) => {
  const { Meta } = Card;

  return (!(thumbnail || productName || typeof price !== 'undefined'))
    ? null
    : (
      <Col
        xl={6} md={8} sm={12} xs={24}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card
          hoverable
          style={{ width: 240, position: "relative" }}
          cover={<Image alt={productName} src={thumbnail} />}
          actions={[ <AddToCart /> ]}
        >
          <Link to={`/products/${id}`} style={{ height: "61.138px" }}>
            <Meta title={productName} description={`${price}₽`} />
          </Link>
        </Card>
      </Col>
    );
}

export default Product;
