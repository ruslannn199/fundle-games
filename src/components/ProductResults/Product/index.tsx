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
      <Col span={6}>
        <ConfigProvider theme={blackTheme}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<Image alt={name} src={thumbnail} />}
            actions={[
              <Button type="primary">Add to Cart</Button>
            ]}
          >
            <Meta title={name} description={`${price}₽`} />
          </Card>
        </ConfigProvider>
      </Col>
    );
}

export default Product;
