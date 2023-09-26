// Components
import { Button, Card, Col, ConfigProvider, Image } from 'antd';
// Themes
import { blackTheme } from '../../../utils/themes';
// Types
import type { ProductData } from '../../../types/interfaces';

type ProductElementPropsFromData = Record<'productConfig', Pick<ProductData, 'thumbnail' | 'price' | 'productName'>>;

interface ProductElementProps extends ProductElementPropsFromData {
  position: number;
}

const Product: React.FC<ProductElementProps> =
  ({
    productConfig: { thumbnail, price, productName },
  }) => {

  const { Meta } = Card;

  return (!(thumbnail || productName || typeof price !== 'undefined'))
    ? null
    : (
      <Col
        xl={6} md={8} sm={12} xs={24}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<Image alt={productName} src={thumbnail} />}
          actions={[
            <ConfigProvider theme={blackTheme}>
              <Button type="primary">Add to Cart</Button>
            </ConfigProvider>
          ]}
        >
          <Meta title={productName} description={`${price}₽`} />
        </Card>
      </Col>
    );
}

export default Product;
