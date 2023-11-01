import { Flex, Popover } from 'antd';
import { useLocation } from 'react-router-dom';
import Checkout from '../Checkout';
import ShoppingCart from '../ShoppingCart';
import { useWindowDimensions } from '../../hooks';
import { NavigationItemsLabels } from '../../types/enums';
import CartModal from '../CartModal';
import { CartPopupLink } from './CartPopup.styles';

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
