import { CheckoutCounterButton } from './CheckoutCounter.styles';

interface CheckoutCounterProps {
  onClick: () => void;
  icon: React.ReactNode;
}

const CheckoutCounter: React.FC<CheckoutCounterProps> = ({ onClick, icon }) => (
  <CheckoutCounterButton
    type="text"
    onClick={onClick}
    icon={icon}
  />
);

export default CheckoutCounter;
