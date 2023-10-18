import { Form, Input, ConfigProvider, Flex } from 'antd';
import { FlagOutlined, HomeFilled, HomeOutlined, InsertRowRightOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { orangeTheme } from '../../utils/themes';
import { useState } from 'react';
import CountrySearch from '../CountrySearch';
import { orderFields } from '../../types/types';
import PayButton from '../PayButton';

const PaymentDetails: React.FC = () => {
  const [recipientCountry, setRecipientCountry] = useState<string>('Russia');
  const [billerCountry, setBillerCountry] = useState('Russia');
  const [form] = Form.useForm<orderFields>();

  const handleFormSubmit = (values: orderFields) => {
    console.log(values);
  }

  const handleBillingCountryChange = (value: string) => {
    setBillerCountry(value);
  }

  const handleRecipientCountryChange = (value: string) => {
    setRecipientCountry(value);
  }

  return (
    <ConfigProvider theme={orangeTheme}>
      <Form
        form={form}
        initialValues={{ remember: true }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 32 }}
        onFinish={handleFormSubmit}
        autoComplete="on"
        name="Payment"
      >
        <h2 className="form__title">Your order</h2>

        <h3 className="form__title">Shipping address</h3>

        <Form.Item
          name="recipientName"
          rules={[{
            required: true,
            message: "Please, put recipient's name",
          }]}
        >
          <Input
            prefix={<UserOutlined className="form__icon" />}
            placeholder="Recipient's full name"
            style={{ width: 300 }}
          />
        </Form.Item>

        <Form.Item
          name="recipientLine1"
          rules={[{
            required: true,
            message: "Please, put main recipient's address",
          }]}
        >
          <Input
            prefix={<HomeOutlined className="form__icon" />}
            placeholder="Address Line 1 (or company name)"
            style={{ width: 300 }}
          />
        </Form.Item>

        <Form.Item name="recipientLine2">
          <Input
            prefix={<HomeFilled className="form__icon" />}
            placeholder="Address Line 2 (optional)"
            style={{ width: 300 }}
          />
        </Form.Item>

        <Form.Item
          name="recipientCity"
          rules={[{
            required: true,
            message: "Please, put recipient's city",
          }]}
        >
          <Input
            prefix={<InsertRowRightOutlined className="form__icon" />}
            placeholder="City"
            style={{ width: 300 }}
          />
        </Form.Item>

        <Form.Item
          name="recipientState"
          rules={[{
            required: true,
            message: "Please, put recipient's state",
          }]}
        >
          <Input
            prefix={<FlagOutlined className="form__icon" />}
            placeholder="State/province/region"
            style={{ width: 300 }}
          />
        </Form.Item>

        <Form.Item
          name="recipientPostalCode"
          rules={[{
            required: true,
            message: "Please, put recipient's postal code",
          }]}
        >
          <Input
            prefix={<MailOutlined className="form__icon" />}
            placeholder="Postal code/ZIP"
            style={{ width: 300 }}
            pattern="[0-9]*"
          />
        </Form.Item>

        <Form.Item>
          <CountrySearch onChange={handleRecipientCountryChange} />
        </Form.Item>

        <h3 className="form__title">Billing address</h3>

        <Form.Item
          name="billerName"
          rules={[{
            required: true,
            message: "Please, put biller's name",
          }]}
        >
          <Input
            prefix={<UserOutlined className="form__icon" />}
            placeholder="Name on Card"
            style={{ width: 300 }}
          />
        </Form.Item>

        <Form.Item
          name="billerLine1"
          rules={[{
            required: true,
            message: "Please, put biller's main address",
          }]}
        >
          <Input
            prefix={<HomeOutlined className="form__icon" />}
            placeholder="Address Line 1 (or company name)"
            style={{ width: 300 }}
          />
        </Form.Item>

        <Form.Item name="billerLine2">
          <Input
            prefix={<HomeFilled className="form__icon" />}
            placeholder="Address Line 2 (optional)"
            style={{ width: 300 }}
          />
        </Form.Item>

        <Form.Item
          name="billerCity"
          rules={[{
            required: true,
            message: "Please, put biller's city",
          }]}
        >
          <Input
            prefix={<InsertRowRightOutlined className="form__icon" />}
            placeholder="City"
            style={{ width: 300 }}
          />
        </Form.Item>

        <Form.Item
          name="billerState"
          rules={[{
            required: true,
            message: "Please, put biller's state",
          }]}
        >
          <Input
            prefix={<FlagOutlined className="form__icon" />}
            placeholder="State/Province/Region"
            style={{ width: 300 }}
          />
        </Form.Item>

        <Form.Item
          name="billerPostalCode"
          rules={[{
            required: true,
            message: "Please, put biller's postal code",
          }]}
        >
          <Input
            prefix={<MailOutlined className="form__icon" />}
            placeholder="Postal code/ZIP"
            style={{ width: 300 }}
            pattern="[0-9]*"
          />
        </Form.Item>

        <Form.Item>
          <CountrySearch onChange={handleBillingCountryChange} />
        </Form.Item>

        <Form.Item>
          Card details
        </Form.Item>

        <Form.Item>
          <Flex justify="center">
            <PayButton form={form} />
          </Flex>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
}

export default PaymentDetails;
