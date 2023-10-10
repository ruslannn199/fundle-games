import { Button } from 'antd';

const LoadMoreButton: React.FC<Record<'onLoadMore', () => void>> = ({
  onLoadMore
}) => {
  return (
    <Button style={{ width: "50vw", margin: "1rem" }} type="primary" size="large" onClick={() => onLoadMore()}>
      Load more
    </Button>
  );
};

export default LoadMoreButton;