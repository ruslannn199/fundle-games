// Components
import { Form, Input, Button, ConfigProvider, Tooltip } from 'antd';
import { MailOutlined, LockOutlined, GoogleCircleFilled, QuestionCircleFilled } from '@ant-design/icons';
// Routes
import { Link, useNavigate } from 'react-router-dom';
// Hooks
import { useState, useEffect } from 'react';
// Themes
import { blackTheme, orangeTheme } from '../../utils/themes';
// Firebase
import { auth, signInWithGoogle } from '../../utils/firebase.utils';
import { signInWithEmailAndPassword } from 'firebase/auth';
// Types
import type { loginFields } from '../../types/types';
import { NavigationItemsLabels } from '../../types/enums';
import { useTypedSelector } from '../../hooks';

const SignIn: React.FC = () => {
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();
  const { currentUser } = useTypedSelector((state) => (state.user));

  useEffect(() => {
    if (currentUser) navigate('/');
  }, [currentUser]);

  useEffect(() => {
    if (error) navigate('/error');
  }, [error]);

  const handleSubmit = async ({ email, password }: loginFields) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
      setError(true);
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
      <Form.Item className="form__title">
        <h2>{NavigationItemsLabels.LOGIN}</h2>
      </Form.Item>
      <Form.Item
        name="email"
        rules={[{ required: true }]}
      >
        <Input
          prefix={<MailOutlined className="form__icon" />}
          placeholder="Email"
          style={{ width: 300 }}
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

      <Form.Item style={{margin: 0}} className="wrapper_flex">
        <ConfigProvider theme={blackTheme}>
          <Button type="primary" htmlType="submit" className="form__btn">
            Log in
          </Button>
        </ConfigProvider>
        <span>
          Or <Link
            to={`/${NavigationItemsLabels.REGISTRATION}`}
            className="form__link"
            >register now!
          </Link>
        </span>
      </Form.Item>

      <Form.Item style={{margin: 5}}>
        <Tooltip title="We'll send you reset E-mail" color="orange">
          <QuestionCircleFilled className="form__icon" style={{marginRight: ".5rem"}} />
        </Tooltip>
        <Link to="/recovery" className="form__link">
          Forgot password?
        </Link>
      </Form.Item>

      <Form.Item className="wrapper_flex">
        <ConfigProvider theme={blackTheme}>
          <Button type="default" onClick={signInWithGoogle}>
            Sign in with Google <GoogleCircleFilled />
          </Button>
        </ConfigProvider>
      </Form.Item>
    </Form>
  </ConfigProvider>
)};

export default SignIn;
