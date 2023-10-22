import { useTypedSelector } from '../../hooks';
import { CartModalWrapper } from './CartModal.styles';

const CartModal: React.FC = () => {
  const { cartItemsAmount } = useTypedSelector((state) => (state.cartData));

  return cartItemsAmount
    ? (
      <CartModalWrapper>
        {cartItemsAmount}
      </CartModalWrapper>
    )
    : null;
}

export default CartModal;
