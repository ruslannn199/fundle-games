// Images
import EllipseBackground from '../../assets/images/ellipse.png';
import { useTypedSelector } from '../../hooks';

const CartModal: React.FC = () => {
  const { cartItemsAmount } = useTypedSelector((state) => (state.cartData));

  return cartItemsAmount
    ? (
      <div style={{
        backgroundImage: `url(${EllipseBackground})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "24px",
        textAlign: "center",
        position: "absolute",
        right: "-5px",
        top: "10px",
        fontWeight: "bold",
      }}>
        {cartItemsAmount}
      </div>
    )
    : null;
}

export default CartModal;
