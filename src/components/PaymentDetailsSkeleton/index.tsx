// Components
import { Skeleton } from 'antd';
// Hooks
import { useWindowDimensions } from '../../hooks';
// Styles
import { PaymentDetailsSkeletonWrapper } from './PaymentDetailsSkeleton.styles'

const PaymentDetailsSkeleton: React.FC = () => {
  const { width } = useWindowDimensions();
  const formItemsInSectionAmount = 7;
  const isMobile = width > 576;

  return (
    <PaymentDetailsSkeletonWrapper vertical align="center">
      <Skeleton.Input active style={{
        width: isMobile ? "20rem" : "100%",
        margin: "2.5rem 0 1.5rem",
      }} />
      <Skeleton.Input active style={{
        width: isMobile ? "25rem" : "100%",
        marginBottom: "1.2rem",
      }} />
      {[...new Array(formItemsInSectionAmount)].map((item, key) => (
        <Skeleton.Input size="small" key={key} active style={{ width: isMobile ? "40rem" : "100%" }} />
      ))}
      <Skeleton.Input active style={{
        width: isMobile ? "25rem" : "100%",
        margin: "2.4rem 0 1.2rem",
      }} />
      {[...new Array(formItemsInSectionAmount)].map((item, key) => (
        <Skeleton.Input size="small" key={key} active style={{ width: isMobile ? "40rem" : "100%" }} />
      ))}
    </PaymentDetailsSkeletonWrapper>
  );
};

export default PaymentDetailsSkeleton;
