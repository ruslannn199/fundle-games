import { Form, Input, Button, ConfigProvider, MenuProps } from 'antd';
import { UserOutlined, LockOutlined, GoogleCircleFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { NavigationItemsLabels } from '../../types/enums';
import { blackTheme, orangeTheme } from '../../utils/themes';
import { signInWithGoogle } from '../../utils/firebase.utils';

const SignIn: React.FC = () => {

  const handleSubmit: MenuProps['onSubmit'] = async (e): Promise<void> => {
    e.preventDefault();
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
        name="username"
        rules={[{ required: true }]}
      >
        <Input prefix={<UserOutlined className='form__icon' />} placeholder="Username" />
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

      <Form.Item>
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
