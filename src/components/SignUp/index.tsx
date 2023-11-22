// Components
import { ConfigProvider, Flex, Form } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
// Hooks
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTypedSelector, useUserActions } from '../../hooks';
// Styles
import { FormButton, FormInput, FormLink, FormTitle } from '../../styles/Form';
// Themes
import { blackTheme, orangeTheme } from '../../utils/themes';
// Types
import { NavigationItemsLabels } from '../../types/enums';
import type { registrationFields } from '../../types/types';

const SignUp: React.FC = () => {
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();
  const { currentUser } = useTypedSelector((state) => (state.user));
  const { resetUserState, emailSignUpStart } = useUserActions();

  useEffect(() => {
    if (currentUser) navigate('/');
  }, [currentUser, navigate]);

  useEffect(() => {
    resetUserState();
  }, [resetUserState]);

  useEffect(() => {
    if (error) navigate('/error');
  }, [error, navigate]);

  const handleSubmit = async ({ displayName, email, password, confirmPassword }: registrationFields) => {
    try {
      emailSignUpStart({ displayName, email, password, confirmPassword });
    } catch (err) {
      if (err instanceof Error) console.error(err.message);
      setError(true);
    }
  }

  return (
  <ConfigProvider theme={orangeTheme}>
    <Form
      name={NavigationItemsLabels.REGISTRATION}
      initialValues={{ remember: true }}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 32 }}
      onFinish={handleSubmit}
    >
      <FormTitle level={3}>Регистрация</FormTitle>

      <Form.Item
        name="displayName"
        rules={[{ required: true, message: "Пожалуйста, введите ваше имя" }]}
      >
        <FormInput
          prefix={<UserOutlined className="form__icon" />}
          placeholder="Имя пользователя"
        />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          { type: "email", message: "Ваша почта введена некорректно!" },
          { required: true, message: "Пожалуйста, введите вашу почту" },
        ]}
      >
        <FormInput prefix={<MailOutlined className="form__icon" />} placeholder="E-mail" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Пожалуйста, введите пароль" }]}
      >
        <FormInput
          prefix={<LockOutlined />}
          type="password"
          placeholder="Пароль"
          minLength={6}
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        rules={[
          { required: true, message: "Пожалуйста, введите пароль снова" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Ваши пароли не совпадают!"));
            },
          }),
        ]}
      >
        <FormInput
          prefix={<LockOutlined />}
          type="password"
          placeholder="Подтверждение пароля"
          minLength={6}
        />
      </Form.Item>

      <Flex justify="center" align="center">
        <ConfigProvider theme={blackTheme}>
          <FormButton type="primary" htmlType="submit">
            Зарегистрироваться
          </FormButton>
        </ConfigProvider>
        <span>
          Или <FormLink
            to={`/${NavigationItemsLabels.LOGIN}`}
            >войти!
          </FormLink>
        </span>
      </Flex>
    </Form>
  </ConfigProvider>
)};

export default SignUp;
