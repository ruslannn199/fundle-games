// Components
import { Button, ConfigProvider, Flex, Form, Input } from 'antd';
import { MailOutlined } from '@ant-design/icons';
// Firebase
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../utils/firebase.utils';
// Hooks
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTypedSelector } from '../../hooks';
// Themes
import { blackTheme, orangeTheme } from '../../utils/themes';
import { FormButton, FormTitle } from '../../styles/Form';

const ResetPassword: React.FC = () => {
  const [form] = Form.useForm<Record<'email', string>>();
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();
  const { currentUser } = useTypedSelector((state) => (state.user));

  useEffect(() => {
    if (currentUser) navigate('/');
  }, [currentUser, navigate]);


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
  }, [error, form]);

  return (
  <ConfigProvider theme={orangeTheme}>
    <Form
      name="resetPassword"
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 32 }}
      onFinish={handleSubmit}
    >
      <FormTitle level={3}>Reset Password</FormTitle>

      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          { required: true },
          { validator: async (_): Promise<void> => {
            if (error) throw new Error("This E-mail do not exist!");
          }},
        ]}
      >
        <Input
          prefix={<MailOutlined className="form__icon" />}
          placeholder="Email"
          style={{ width: "50rem" }}
          onChange={() => setError(false)}
        />
      </Form.Item>

      <Flex justify="center">
        <ConfigProvider theme={blackTheme}>
          <FormButton type="primary" htmlType="submit">
            Send a password reset E-mail
          </FormButton>
        </ConfigProvider>
      </Flex>
    </Form>
  </ConfigProvider>
)};

export default ResetPassword;