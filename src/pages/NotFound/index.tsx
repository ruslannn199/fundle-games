import { Button, ConfigProvider, Result } from 'antd';
import { Link } from 'react-router-dom';
import { blackTheme } from '../../utils/themes';

const NotFound: React.FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Извините, страница, которую вы пытаетесь посетить, не существует."
      extra={
        <ConfigProvider theme={blackTheme}>
          <Link to="/">
            <Button type="primary">На главную</Button>
          </Link>
        </ConfigProvider>
      }
    />
  );
}

export default NotFound;
