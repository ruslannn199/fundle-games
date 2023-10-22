import { Popover } from 'antd';
import { useLocation } from 'react-router-dom';
import CartModal from '../CartModal';
import Checkout from '../Checkout';
import { CartPopupLink } from './CartPopup.styles';
import ShoppingCart from '../ShoppingCart';

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
        style={{ height: "10rem" }}
      >
        <CartPopupLink to="/cart">
          <ShoppingCart />
          <CartModal />
        </CartPopupLink>
      </Popover>
    )
    : (
      <div style={{ height: "10rem" }}>
        <ShoppingCart />
      </div>
    )
}

export default CartPopup;
