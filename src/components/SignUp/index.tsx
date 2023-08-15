// Components
import { Button, ConfigProvider, Form, Input } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
// Themes
import { blackTheme, orangeTheme } from '../../utils/themes';
// Routes
import { Link, useNavigate } from 'react-router-dom';
// Hooks
import { useState, useEffect } from 'react';
import { useTypedSelector } from '../../hooks';
// Firebase
import { auth } from '../../utils/firebase.utils';
import { updateProfile } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
// Types
import { NavigationItemsLabels } from '../../types/enums';
import type { registrationFields } from '../../types/types';
import type { UserCredential } from 'firebase/auth';

const SignUp: React.FC = () => {
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();
  const { currentUser } = useTypedSelector((state) => (state.user));

  useEffect(() => {
    if (currentUser) navigate('/');
  }, [currentUser]);

  useEffect(() => {
    if (error) navigate('/error');
  }, [error]);

  const handleSubmit = async ({ displayName, email, password }: registrationFields) => {
    try {
      const { user }: UserCredential =
        await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName });
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
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
      validateMessages={{ required: "Please, input your ${name}"}}
      onFinish={handleSubmit}
    >
      <Form.Item className="form__title">
        <h2>{NavigationItemsLabels.REGISTRATION}</h2>
      </Form.Item>

      <Form.Item
        name="displayName"
        rules={[{ required: true }]}
      >
        <Input
          prefix={<UserOutlined className="form__icon" />}
          placeholder="Username"
          style={{ width: 320 }}
        />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!"
          },
          { required: true },
        ]}
      >
        <Input prefix={<MailOutlined className="form__icon" />} placeholder="E-mail" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true }]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
          minLength={6}
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        rules={[
          { required: true },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("The new password that you entered do not match!"));
            },
          }),
        ]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Confirm password"
          minLength={6}
        />
      </Form.Item>

      <Form.Item className="wrapper_flex">
        <ConfigProvider theme={blackTheme}>
          <Button type="primary" htmlType="submit" className="form__btn">
            Register
          </Button>
        </ConfigProvider>
        <span>
          Or <Link
            to={`/${NavigationItemsLabels.LOGIN}`}
            className="form__link"
            >log in!
          </Link>
        </span>
      </Form.Item>
    </Form>
  </ConfigProvider>
)};

export default SignUp;
