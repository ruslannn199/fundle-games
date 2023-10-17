import { Button, ConfigProvider } from 'antd';
import { blackTheme } from '../../utils/themes';
import { Link } from 'react-router-dom';

const OrderButton: React.FC = () => {
  return (
    <ConfigProvider theme={blackTheme}>
      <Link to="/payment">
        <Button type="primary" size="large">
          Order now
        </Button>
      </Link>
    </ConfigProvider>
  );
}

export default OrderButton;
