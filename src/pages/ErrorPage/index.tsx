// Components
import { Button, ConfigProvider, Result } from 'antd';
import { Link } from 'react-router-dom';
// Themes
import { blackTheme } from '../../utils/themes';
import { ResultProps } from 'antd/es/result';

interface ErrorPageProps {
  reason?: string;
}

const getErrorPageData = (reason: string = ''): Pick<ResultProps, 'title' | 'subTitle'> => {
  switch (reason) {
    case 'payment':
      return {
        title: 'Произошла ошибка оплаты',
        subTitle: 'Пожалуйста, проверьте, достаточно ли денег на вашем счёте или верны ли все указанные вами данные',
      }
    default:
      return {
        title: 'Что-то пошло не так...',
        subTitle: 'Произошла неизвестная ошибка. Сообщите о ней в поддержку'
      };
  }
}

const ErrorPage: React.FC<ErrorPageProps> = ({ reason }) => {
  const { title, subTitle } = getErrorPageData(reason);
  return (
    <Result
      status="error"
      title={title}
      subTitle={subTitle}
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
