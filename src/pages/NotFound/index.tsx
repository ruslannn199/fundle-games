import { Button, ConfigProvider, Result } from 'antd';
import { Link } from 'react-router-dom';
import { blackTheme } from '../../utils/themes';

const NotFound: React.FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <ConfigProvider theme={blackTheme}>
          <Link to="/">
            <Button type="primary">Back Home</Button>
          </Link>
        </ConfigProvider>
      }
    />
  );
}

export default NotFound;
