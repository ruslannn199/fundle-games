import { useEffect } from 'react';
import { useOrdersActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks';
import { Spin } from 'antd';
import Spinner from '../../components/Spinner';
import OrderCard from '../../components/OrderCard';
import { DashboardWrapper } from './Dashboard.styles';

const Dashboard: React.FC = () => {
  const { isLoading } = useTypedSelector((state) => (state.loader));
  const { currentUser } = useTypedSelector((state) => (state.user));
  const { getUserOrderHistoryStart } = useOrdersActions();
  const { orderHistory } = useTypedSelector((state) => (state.ordersData));

  useEffect(() => {
    if (currentUser) {
      getUserOrderHistoryStart(currentUser.id);
    }
  }, [getUserOrderHistoryStart]);

  return (
    <Spin spinning={isLoading} indicator={Spinner}>
      <DashboardWrapper vertical justify="center" align="center">
        {orderHistory.map((order, index) => (<OrderCard key={index} items={order} />))}
      </DashboardWrapper>
    </Spin>
  );
};

export default Dashboard;
