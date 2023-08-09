import { Form, Input, Button, ConfigProvider } from 'antd';
import { MailOutlined, LockOutlined, GoogleCircleFilled } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { NavigationItemsLabels } from '../../types/enums';
import { blackTheme, orangeTheme } from '../../utils/themes';
import { auth, signInWithGoogle } from '../../utils/firebase.utils';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { loginFields } from '../../types/types';

const SignIn: React.FC = () => {
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

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
      validateMessages={{ required: 'Please, input your ${name}'}}
      onFinish={handleSubmit}
    >
      <Form.Item className='form__title'>
        <h2>{NavigationItemsLabels.LOGIN}</h2>
      </Form.Item>
      <Form.Item
        name="email"
        rules={[{ required: true }]}
      >
        <Input
          prefix={<MailOutlined className='form__icon' />}
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

      <Form.Item className='wrapper_flex'>
        <ConfigProvider theme={blackTheme}>
          <Button type="primary" htmlType="submit" className='form__btn'>
            Log in
          </Button>
        </ConfigProvider>
        <span>
          Or <Link
            to={`/${NavigationItemsLabels.REGISTRATION}`}
            className='form__link'
            >register now!
          </Link>
        </span>
      </Form.Item>

      <Form.Item className='wrapper_flex'>
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
