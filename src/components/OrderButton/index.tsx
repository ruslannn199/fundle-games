// Components
import { Button, ConfigProvider } from 'antd';
import { Link } from 'react-router-dom';
// Themes
import { blackTheme } from '../../utils/themes';

const OrderButton: React.FC = () => {
  return (
    <ConfigProvider theme={blackTheme}>
      <Link to="/payment">
        <Button type="primary" size="large">
          Сделать заказ
        </Button>
      </Link>
    </ConfigProvider>
  );
}

export default OrderButton;
