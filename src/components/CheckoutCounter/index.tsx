import { Button } from 'antd';

interface CheckoutCounterProps {
  onClick: () => void;
  icon: React.ReactNode;
}

const CheckoutCounter: React.FC<CheckoutCounterProps> = ({ onClick, icon }) => (
  <Button
    type="text"
    onClick={onClick}
    icon={icon}
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "2rem",
      height: "2rem",
      padding: 0,
      fontSize: "2rem",
      lineHeight: 1,
    }}
  />
);

export default CheckoutCounter;
