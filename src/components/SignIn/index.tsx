// Components
import { Form, Button, ConfigProvider, Tooltip, Flex } from 'antd';
import {
  MailOutlined,
  LockOutlined,
  GoogleCircleFilled,
  QuestionCircleFilled
} from '@ant-design/icons';
// Hooks
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTypedSelector, useUserActions } from '../../hooks';
// Styles
import { FormButton, FormLink, FormTitle, FormInput } from '../../styles/Form';
import { SignInActionsWrapper, SignInRecoveryWrapper } from './SignIn.styles';
// Themes
import { blackTheme, orangeTheme } from '../../utils/themes';
// Types
import type { loginFields } from '../../types/types';
import { NavigationItemsLabels, UserRoles } from '../../types/enums';
import TestButton from '../TestButton';

const SignIn: React.FC = () => {
  const [, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const { currentUser, userErrors } = useTypedSelector((state) => (state.user));
  const {
    emailSignInStart,
    googleSignInStart,
    resetUserState
  } = useUserActions();

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    } else {
      setErrors(userErrors);
    }
  }, [currentUser, userErrors, navigate]);

  useEffect(() => {
    resetUserState();
  }, [resetUserState]);

  const handleSubmit = async ({ email, password }: loginFields) => {
    try {
      emailSignInStart({ email, password });
    } catch (err) {
      setErrors(userErrors);
    }
  }

  return (
  <ConfigProvider theme={orangeTheme}>
    <Form
      name={NavigationItemsLabels.LOGIN}
      initialValues={{ remember: true }}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 32 }}
      onFinish={handleSubmit}
    >
      <FormTitle level={3}>Вход</FormTitle>

      <Form.Item
        name="email"
        rules={[{ required: true, message: "Пожалуйста, введите вашу почту" }]}
      >
        <FormInput
          prefix={<MailOutlined className="form__icon" />}
          placeholder="Email"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Пожалуйста, введите ваш пароль" }]}
      >
        <FormInput
          prefix={<LockOutlined />}
          type="password"
          placeholder="Пароль"
        />
      </Form.Item>

      <SignInActionsWrapper justify="center" align="center">
        <ConfigProvider theme={blackTheme}>
          <FormButton type="primary" htmlType="submit">
            Войти
          </FormButton>
        </ConfigProvider>
        <span>
          или <FormLink
            to={`/${NavigationItemsLabels.REGISTRATION}`}
            >зарегистрироваться!
          </FormLink>
        </span>
      </SignInActionsWrapper>

      <Flex justify="center" gap="3rem" style={{ padding: "1rem" }}>
        <TestButton type={UserRoles.ADMIN} />
        <TestButton type={UserRoles.USER} />
      </Flex>

      <SignInRecoveryWrapper>
        <Tooltip title="Мы вам отправим письмо с восстановлением пароля" color="orange">
          <QuestionCircleFilled className="form__icon" style={{ marginRight: ".5rem" }} />
        </Tooltip>
        <FormLink to="/recovery">
          Забыли пароль?
        </FormLink>
      </SignInRecoveryWrapper>

      <Flex justify="center">
        <ConfigProvider theme={blackTheme}>
          <Button type="default" onClick={() => googleSignInStart()}>
            Войти при помощи Google <GoogleCircleFilled />
          </Button>
        </ConfigProvider>
      </Flex>
    </Form>
  </ConfigProvider>
)};

export default SignIn;
