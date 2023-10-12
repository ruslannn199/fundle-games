// Components
import { Button, Card, Col, ConfigProvider, Image } from 'antd';
// Themes
import { blackTheme } from '../../../utils/themes';
// Types
import type { ProductData } from '../../../types/interfaces';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import AddToCart from '../../AddToCart';

type ProductElementPropsFromData = Record<'productConfig', Pick<ProductData, 'thumbnail' | 'price' | 'productName' | 'id'>>;

interface ProductElementProps extends ProductElementPropsFromData {
  position: number;
}

const Product: React.FC<ProductElementProps> = ({ productConfig: { thumbnail, price, productName, id } }) => {
  const { Meta } = Card;
  const [isHover, setHover] = useState<boolean>(false);

  return (!(thumbnail || productName || typeof price !== 'undefined'))
    ? null
    : (
      <Col
        xl={6} md={8} sm={12} xs={24}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card
          hoverable
          style={{ width: 240, ...(isHover ? { position: 'absolute', zIndex: '10', top: 'calc(-500px / 3)', } : {}) }}
          cover={<Image alt={productName} src={thumbnail} />}
          onMouseOver={() => (setHover(true))}
          onMouseLeave={() => (setHover(false))}
          actions={ isHover ? [ <AddToCart /> ] : [] }
        >
          <Link to={`/products/${id}`}>
            <Meta title={productName} description={`${price}₽`} />
          </Link>
        </Card>
      </Col>
    );
}

export default Product;
