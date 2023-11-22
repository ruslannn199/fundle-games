// Components
import { Flex, Popover } from 'antd';
import Checkout from '../Checkout';
import ShoppingCart from '../ShoppingCart';
import CartModal from '../CartModal';
// Hooks
import { useLocation } from 'react-router-dom';
import { useWindowDimensions } from '../../hooks';
// Styles
import { CartPopupLink } from './CartPopup.styles';
// Types
import { NavigationItemsLabels } from '../../types/enums';

const CartPopup: React.FC = () => {
  const location = useLocation();
  const { width } = useWindowDimensions();
  const isMobile = width <= 768;
  const isDeprecatedLocation = location.pathname.includes('/cart') || location.pathname.includes('/payment');

  return isDeprecatedLocation || isMobile
    ? (
      <Flex align="center" style={{ height: "6.4rem" }}>
        {
          isDeprecatedLocation
            ? <ShoppingCart />
            : (
              <CartPopupLink to={`/${NavigationItemsLabels.CART}`}>
                <ShoppingCart />
                <CartModal />
              </CartPopupLink>
            )
        }
      </Flex>
    )
    : (
      <Popover
        placement="bottomRight"
        title="Корзина"
        trigger="hover"
        content={<Checkout />}
      >
        <CartPopupLink to={`/${NavigationItemsLabels.CART}`}>
          <ShoppingCart />
          <CartModal />
        </CartPopupLink>
      </Popover>
    );
}

export default CartPopup;
