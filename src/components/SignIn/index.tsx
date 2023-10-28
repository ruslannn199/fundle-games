// Components
import { Form, Input, Button, ConfigProvider, Tooltip, Flex } from 'antd';
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
// Themes
import { blackTheme, orangeTheme } from '../../utils/themes';
// Types
import type { loginFields } from '../../types/types';
import { NavigationItemsLabels } from '../../types/enums';
import { FormButton, FormLink, FormTitle } from '../../styles/Form';
import { SignInActionsWrapper, SignInRecoveryWrapper } from './SignIn.styles';

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
      validateMessages={{ required: "Please, input your ${name}"}}
      onFinish={handleSubmit}
    >
      <FormTitle level={3}>{NavigationItemsLabels.LOGIN}</FormTitle>

      <Form.Item
        name="email"
        rules={[{ required: true }]}
      >
        <Input
          prefix={<MailOutlined className="form__icon" />}
          placeholder="Email"
          style={{ width: "50rem" }}
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true }]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <SignInActionsWrapper justify="center" align="center">
        <ConfigProvider theme={blackTheme}>
          <FormButton type="primary" htmlType="submit">
            Log in
          </FormButton>
        </ConfigProvider>
        <span>
          Or <FormLink
            to={`/${NavigationItemsLabels.REGISTRATION}`}
            >register now!
          </FormLink>
        </span>
      </SignInActionsWrapper>

      <SignInRecoveryWrapper>
        <Tooltip title="We'll send you reset E-mail" color="orange">
          <QuestionCircleFilled className="form__icon" style={{ marginRight: ".5rem" }} />
        </Tooltip>
        <FormLink to="/recovery">
          Forgot password?
        </FormLink>
      </SignInRecoveryWrapper>

      <Flex justify="center">
        <ConfigProvider theme={blackTheme}>
          <Button type="default" onClick={() => googleSignInStart()}>
            Sign in with Google <GoogleCircleFilled />
          </Button>
        </ConfigProvider>
      </Flex>
    </Form>
  </ConfigProvider>
)};

export default SignIn;
