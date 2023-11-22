// Components
import { Button, ConfigProvider, Form, FormInstance } from 'antd';
// Hooks
import { useEffect, useState } from 'react';
// Themes
import { blackTheme } from '../../utils/themes';

interface PayButtonProps {
  form: FormInstance
}

const PayButton: React.FC<PayButtonProps> = ({ form }) => {
  const [submittable, setSubmittable] = useState<boolean>(false);
  const values = Form.useWatch([], form);
  
  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(
        () => {
          setSubmittable(true);
        },
        () => {
          setSubmittable(false);
        }
      );
  }, [values, form]);

  return (
    <ConfigProvider theme={blackTheme}>
      <Button type="primary" htmlType="submit" disabled={!submittable}>
        Оплатить
      </Button>
    </ConfigProvider>
  );
}

export default PayButton;
