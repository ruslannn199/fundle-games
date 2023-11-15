// Components
import { Button, ConfigProvider, Result } from 'antd';
import { Link } from 'react-router-dom';
// Themes
import { blackTheme } from '../../utils/themes';

const ErrorPage: React.FC = () => {
  return (
    <Result
      status="error"
      title="Оплата прошла неудачно"
      subTitle="Пожалуйста, проверьте, достаточно ли денег на вашем счёте или верны ли все указанные вами данные"
      extra={
        <ConfigProvider theme={blackTheme}>
          <Link to="/">
            <Button type="primary">На главную</Button>
          </Link>
        </ConfigProvider>
      }
    />
  )
}

export default ErrorPage;
