import { Button, ConfigProvider, Form, FormInstance } from 'antd';
import { blackTheme } from '../../utils/themes';
import { useEffect, useState } from 'react';

const PayButton: React.FC<Record<'form', FormInstance>> = ({ form }) => {
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
        Pay now
      </Button>
    </ConfigProvider>
  );
}

export default PayButton;
