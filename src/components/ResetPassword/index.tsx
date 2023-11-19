// Components
import { ConfigProvider, Flex, Form, Input } from 'antd';
import { MailOutlined } from '@ant-design/icons';
// Firebase
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../utils/firebase.utils';
// Hooks
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTypedSelector } from '../../hooks';
// Styles
import { FormButton, FormInput, FormTitle } from '../../styles/Form';
// Themes
import { blackTheme, orangeTheme } from '../../utils/themes';

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
      await sendPasswordResetEmail(auth, email, { url: import.meta.env.DEV
        ? 'http://localhost:3000/login'
        : 'https://fundle-games.infinityfreeapp.com/login'
      });
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
      <FormTitle level={3}>Восстановить пароль</FormTitle>

      <Form.Item
        name="email"
        rules={[
          { type: "email", message: "Ваша почта введена некорректно!" },
          { required: true, message: "Пожалуйста, введите вашу почту" },
          { validator: async (_): Promise<void> => {
            if (error) throw new Error("Данная почта не существует!");
          }},
        ]}
      >
        <FormInput
          prefix={<MailOutlined className="form__icon" />}
          placeholder="Email"
          onChange={() => setError(false)}
        />
      </Form.Item>

      <Flex justify="center">
        <ConfigProvider theme={blackTheme}>
          <FormButton type="primary" htmlType="submit">
            Отправить письмо
          </FormButton>
        </ConfigProvider>
      </Flex>
    </Form>
  </ConfigProvider>
)};

export default ResetPassword;