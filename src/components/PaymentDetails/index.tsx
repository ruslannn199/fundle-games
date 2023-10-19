import { Form, Input, ConfigProvider, Flex } from 'antd';
import { FlagOutlined, HomeFilled, HomeOutlined, InsertRowRightOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { orangeTheme } from '../../utils/themes';
import { useEffect, useState } from 'react';
import CountrySearch from '../CountrySearch';
import { orderFields } from '../../types/types';
import PayButton from '../PayButton';
import { CardElement, useStripe } from '@stripe/react-stripe-js';
import { StripeCardElementOptions } from '@stripe/stripe-js';
import { useElements } from '@stripe/react-stripe-js';
import { stripeApi } from '../../utils';
import { useTypedSelector } from '../../hooks';

const PaymentDetails: React.FC = () => {
  const { cartItemsAmount } = useTypedSelector((state) => (state.cartData));
  const [message, setMessage] = useState<string | null>(null);
  const { clientSecret } = useTypedSelector((state) => (state.user));
  const [recipientCountry, setRecipientCountry] = useState<string>('Russia');
  const [billerCountry, setBillerCountry] = useState('Russia');
  const [form] = Form.useForm<orderFields>();
  const elements = useElements();
  const stripe = useStripe();

  useEffect(() => {
    if (!stripe || !clientSecret) {
      return () => (setMessage('Something went wrong.'));
    }
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleFormSubmit = async (values: orderFields) => {
    const {
      recipientName,
      recipientCity,
      recipientLine1,
      recipientLine2,
      recipientPostalCode,
      recipientState,
      billerName
    } = values;
    const cardElement = elements?.getElement('card');

    if (stripe && elements && clientSecret && cardElement) {
      const result = await stripe.confirmCardPayment(clientSecret , {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: billerName,
          },
        },
        return_url: 'http://localhost:3000/',
        shipping: {
          name: recipientName,
          address: {
            city: recipientCity,
            line1: recipientLine1,
            line2: recipientLine2,
            postal_code: recipientPostalCode,
            state: recipientState,
          }
        }
      }, {
        handleActions: false,
      });
      console.log(result);
    }
  }

  const handleBillingCountryChange = (value: string) => {
    setBillerCountry(value);
  }

  const handleRecipientCountryChange = (value: string) => {
    setRecipientCountry(value);
  }

  const configCardElement: StripeCardElementOptions = {
    iconStyle: 'solid',
    style: {
      base: {
        fontSize: '16px',
      },
    },
    hidePostalCode: true,
  };

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
          <h2>Card details</h2>
          <CardElement
            options={configCardElement}
          />
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
