import { Button, ConfigProvider, Form, Input } from 'antd';
import { blackTheme, orangeTheme } from '../../utils/themes';
import { MailOutlined } from '@ant-design/icons';
// Hooks
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
// Firebase
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../utils/firebase.utils';

const ResetPassword: React.FC = () => {
  const [form] = Form.useForm<Record<'email', string>>();
  const navigate = useNavigate();
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = async ({ email }: Record<'email', string>) => {
    try {
      await sendPasswordResetEmail(auth, email, { url: 'http://localhost:3000/login' });
      navigate('/');
    } catch {
      setError(true);
    }
  }

  useEffect(() => {
    form.validateFields();
  }, [error]);

  return (
  <ConfigProvider theme={orangeTheme}>
    <Form
      name='resetPassword'
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 32 }}
      onFinish={handleSubmit}
    >
      <Form.Item className='form__title'>
        <h2>Reset Password</h2>
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          { required: true },
          { validator: async (_): Promise<void> => {
            if (error) throw new Error('This E-mail do not exist!');
          }},
        ]}
      >
        <Input
          prefix={<MailOutlined className='form__icon' />}
          placeholder="Email"
          style={{ width: 300 }}
          onChange={() => setError(false)}
        />
      </Form.Item>

      <Form.Item className='wrapper_flex'>
        <ConfigProvider theme={blackTheme}>
          <Button type="primary" htmlType="submit" className='form__btn'>
            Send a password reset E-mail
          </Button>
        </ConfigProvider>
        </Form.Item>
    </Form>
  </ConfigProvider>
)};

export default ResetPassword;