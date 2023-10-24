import { useEffect } from 'react';
import { useOrdersActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks';
import { Spin } from 'antd';
import Spinner from '../../components/Spinner';
import OrderHistory from '../../components/OrderHistory';

const Dashboard: React.FC = () => {
  const { isLoading } = useTypedSelector((state) => (state.loader));
  const { currentUser } = useTypedSelector((state) => (state.user));
  const { getUserOrderHistoryStart } = useOrdersActions();

  useEffect(() => {
    if (currentUser) {
      getUserOrderHistoryStart(currentUser.id);
    }
  }, [getUserOrderHistoryStart]);

  return (
    <Spin spinning={isLoading} indicator={Spinner}>
      <OrderHistory />
    </Spin>
  );
};

export default Dashboard;
