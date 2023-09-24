import { Button, Card, Col, ConfigProvider, Image } from 'antd';
import type { ProductData } from '../../../types/interfaces';
import { blackTheme } from '../../../utils/themes';

type ProductElementPropsFromData = Record<'productConfig', Pick<ProductData, 'thumbnail' | 'price' | 'name'>>;

interface ProductElementProps extends ProductElementPropsFromData {
  position: number;
}

const Product: React.FC<ProductElementProps> =
  ({
    productConfig: { thumbnail, price, name },
  }) => {

  const { Meta } = Card;

  return (!(thumbnail || name || typeof price !== 'undefined'))
    ? null
    : (
      <Col
        xl={6} md={8} sm={12} xs={24}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<Image alt={name} src={thumbnail} />}
          actions={[
            <ConfigProvider theme={blackTheme}>
              <Button type="primary">Add to Cart</Button>
            </ConfigProvider>
          ]}
        >
          <Meta title={name} description={`${price}₽`} />
        </Card>
      </Col>
    );
}

export default Product;
