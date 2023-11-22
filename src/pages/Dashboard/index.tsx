// Components
import OrderCard from '../../components/OrderCard';
// Hooks
import { useEffect } from 'react';
import { useOrdersActions } from '../../hooks/useActions';
import { useAuth, useTypedSelector } from '../../hooks';
// Styles
import { DashboardWrapper } from './Dashboard.styles';

const Dashboard: React.FC = () => {
  useAuth();
  const { currentUser } = useTypedSelector((state) => (state.user));
  const { orderHistory } = useTypedSelector((state) => (state.ordersData));
  const { getUserOrderHistoryStart } = useOrdersActions();

  useEffect(() => {
    if (currentUser) {
      getUserOrderHistoryStart(currentUser.id);
    }
  }, [getUserOrderHistoryStart, currentUser]);

  return (
    <DashboardWrapper vertical justify="center" align="center">
      {orderHistory.map((order, index) => (<OrderCard key={index} items={order} />))}
    </DashboardWrapper>
  );
};

export default Dashboard;
