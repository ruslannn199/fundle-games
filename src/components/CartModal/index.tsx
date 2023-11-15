// Hooks
import { useTypedSelector } from '../../hooks';
// Styles
import { CartModalWrapper } from './CartModal.styles';

const CartModal: React.FC = () => {
  const { cartItemsAmount } = useTypedSelector((state) => (state.cartData));

  return cartItemsAmount
    ? (
      <CartModalWrapper align="center" justify="center">
        {cartItemsAmount}
      </CartModalWrapper>
    )
    : null;
}

export default CartModal;
