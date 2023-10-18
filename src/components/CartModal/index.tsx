// Images
import EllipseBackground from '../../assets/images/ellipse.png';

interface CartModalProps {
  itemsCounter: number;
}

const CartModal: React.FC<CartModalProps> = ({ itemsCounter }) => {
  return (
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
      {itemsCounter}
    </div>
  );
}

export default CartModal;
