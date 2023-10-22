import { ShoppingCartOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import CartModal from '../CartModal';
import Checkout from '../Checkout';
import { CartPopupLink } from './CartPopup.styles';

const CartPopup: React.FC = () => {
  const location = useLocation();

  const isDeprecatedLocation = location.pathname.includes('/cart') || location.pathname.includes('/payment');

  return !isDeprecatedLocation
    ? (
      <Popover
        placement="bottomRight"
        title="Cart"
        trigger="hover"
        content={<Checkout popup />}
        style={{ height: "64px" }}
      >
        <CartPopupLink to="/cart">
          <ShoppingCartOutlined style={{ fontSize: 42, height: "64px" }} />
          <CartModal />
        </CartPopupLink>
      </Popover>
    )
    : (
      <div style={{ height: "64px" }}>
        <ShoppingCartOutlined style={{ fontSize: 42, height: "64px" }} />
      </div>
    )
}

export default CartPopup;
