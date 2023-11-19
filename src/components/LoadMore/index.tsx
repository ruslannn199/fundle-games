// Components
import { Button } from 'antd';

const LoadMoreButton: React.FC<Record<'onLoadMore', () => void>> = ({
  onLoadMore
}) => {
  return (
    <Button
      style={{ width: "50vw", margin: "1rem", marginTop: "6.5rem" }}
      type="primary"
      size="large"
      onClick={() => onLoadMore()}
    >
      Загрузить ещё
    </Button>
  );
};

export default LoadMoreButton;
