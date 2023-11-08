import { ConfigProvider } from 'antd';
import { blackTheme } from '../../utils/themes';
import { SpinnerDot, SpinnerIndicator, SpinnerWrapper } from './Spinner.styles';

interface SpinnerProps {
  spinning: boolean;
  children?: React.ReactNode;
}

const Spinner: React.FC<SpinnerProps> = ({ children, spinning }) => {
  return (
    <ConfigProvider theme={blackTheme}>
      <SpinnerWrapper
        delay={500}
        fullscreen
        size="large"
        spinning={spinning}
        indicator={<SpinnerIndicator />}
        tip={<h2>Загрузка<SpinnerDot>.</SpinnerDot><SpinnerDot>.</SpinnerDot><SpinnerDot>.</SpinnerDot></h2>}
      >
        {children}
      </SpinnerWrapper>
    </ConfigProvider>
  );
}

export default Spinner;
