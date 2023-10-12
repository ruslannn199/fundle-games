import { Button, ConfigProvider } from 'antd';
import { blackTheme } from '../../utils/themes';

const AddToCart: React.FC = () => {
  return (
    <ConfigProvider theme={blackTheme}>
      <Button type="primary">Add to Cart</Button>
    </ConfigProvider>
  );
}

export default AddToCart;
