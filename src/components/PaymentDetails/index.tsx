import { Form, Input, ConfigProvider, Flex, Spin, Tooltip } from 'antd';
import {
  FlagOutlined,
  HomeFilled,
  HomeOutlined,
  InsertRowRightOutlined,
  MailOutlined,
  QuestionCircleFilled,
  UserOutlined
} from '@ant-design/icons';
import { orangeTheme } from '../../utils/themes';
import { useEffect, useState } from 'react';
import CountrySearch from '../CountrySearch';
import { orderFields } from '../../types/types';
import PayButton from '../PayButton';
import { CardElement, useStripe } from '@stripe/react-stripe-js';
import { StripeCardElementOptions } from '@stripe/stripe-js';
import { useElements } from '@stripe/react-stripe-js';
import { useStripeActions, useTypedSelector } from '../../hooks';
import { FormTitle } from '../../styles/Form';
import Spinner from '../Spinner';

const PaymentDetails: React.FC = () => {
  const { loadingQueue } = useTypedSelector((state) => (state.loader));
  const { cartItems, total } = useTypedSelector((state) => (state.cartData));
  const { retrievePaymentStart, confirmCardPaymentStart } = useStripeActions();
  const [recipientCountry, setRecipientCountry] = useState<string>('RU');
  const [billerCountry, setBillerCountry] = useState<string>('RU');
  const [form] = Form.useForm<orderFields>();
  const elements = useElements();
  const stripe = useStripe();

  useEffect(() => {
    retrievePaymentStart({ stripe, cartData: cartItems, total });
  }, [stripe, cartItems, total, retrievePaymentStart]);

  const handleFormSubmit = (values: orderFields) => {
    const {
      recipientName,
      recipientCity,
      recipientLine1,
      recipientLine2,
      recipientPostalCode,
      recipientState,
      billerName,
      billerCity,
      billerLine1,
      billerLine2,
      billerPostalCode,
      billerState,
    } = values;
    const cardElement = elements?.getElement('card');

    if (cardElement) {
      confirmCardPaymentStart({
        stripe,
        cardPaymentData: {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: billerName,
              address: {
                city: billerCity,
                line1: billerLine1,
                line2: billerLine2,
                postal_code: billerPostalCode,
                state: billerState,
                country: billerCountry,
              }
            },
          },
          return_url: import.meta.env.DEV
            ? 'http://localhost:3000/dashboard'
            : 'https://fundle-games.infinityfreeapp.com/dashboard',
          shipping: {
            name: recipientName,
            address: {
              city: recipientCity,
              line1: recipientLine1,
              line2: recipientLine2,
              postal_code: recipientPostalCode,
              state: recipientState,
              country: recipientCountry,
            }
          }
        },
        cartData: cartItems,
        total,
      })
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
      <Spin spinning={Boolean(loadingQueue.length)} indicator={Spinner}>
        <Form
          id='payment'
          form={form}
          initialValues={{ remember: true }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 32 }}
          onFinish={handleFormSubmit}
          autoComplete="on"
          name="Payment"
        >
          <FormTitle level={2}>Ваш заказ</FormTitle>

          <FormTitle level={3}>Адрес получателя</FormTitle>

          <Form.Item
            name="recipientName"
            rules={[{
              required: true,
              message: "Пожалуйста, заполните имя получателя",
            }]}
          >
            <Input
              prefix={<UserOutlined className="form__icon" />}
              placeholder="ФИО получателя"
            />
          </Form.Item>

          <Form.Item
            name="recipientLine1"
            rules={[{
              required: true,
              message: "Пожалуйста, заполните полный адрес получателя",
            }]}
          >
            <Input
              prefix={<HomeOutlined className="form__icon" />}
              placeholder="Адрес 1 (или название компании)"
            />
          </Form.Item>

          <Form.Item name="recipientLine2">
            <Input
              prefix={<HomeFilled className="form__icon" />}
              placeholder="Адрес 2 (необязательно)"
            />
          </Form.Item>

          <Form.Item
            name="recipientCity"
            rules={[{
              required: true,
              message: "Пожалуйста, заполните город получателя",
            }]}
          >
            <Input
              prefix={<InsertRowRightOutlined className="form__icon" />}
              placeholder="Город"
            />
          </Form.Item>

          <Form.Item
            name="recipientState"
            rules={[{
              required: true,
              message: "Пожалуйста, заполните регион получателя",
            }]}
          >
            <Input
              prefix={<FlagOutlined className="form__icon" />}
              placeholder="Область/штат/регион"
            />
          </Form.Item>

          <Form.Item
            name="recipientPostalCode"
            rules={[{
              required: true,
              message: "Пожалуйста, заполните почтовый индекс получателя",
            }]}
          >
            <Input
              prefix={<MailOutlined className="form__icon" />}
              placeholder="Почтовый индекс/ZIP"
              pattern="[0-9]*"
            />
          </Form.Item>

          <Form.Item>
            <CountrySearch onChange={handleRecipientCountryChange} />
          </Form.Item>

          <FormTitle level={3}>Платёжный адрес</FormTitle>

          <Form.Item
            name="billerName"
            rules={[{
              required: true,
              message: "Пожалуйста, заполните имя на карте",
            }]}
          >
            <Input
              prefix={<UserOutlined className="form__icon" />}
              placeholder="Имя на карте"
            />
          </Form.Item>

          <Form.Item
            name="billerLine1"
            rules={[{
              required: true,
              message: "Пожалуйста, заполните полный адрес плательщика",
            }]}
          >
            <Input
              prefix={<HomeOutlined className="form__icon" />}
              placeholder="Адрес 1 (или название компании)"
            />
          </Form.Item>

          <Form.Item name="billerLine2">
            <Input
              prefix={<HomeFilled className="form__icon" />}
              placeholder="Адрес 2 (необязательно)"
            />
          </Form.Item>

          <Form.Item
            name="billerCity"
            rules={[{
              required: true,
              message: "Пожалуйста, заполните город плательщика",
            }]}
          >
            <Input
              prefix={<InsertRowRightOutlined className="form__icon" />}
              placeholder="Город"
            />
          </Form.Item>

          <Form.Item
            name="billerState"
            rules={[{
              required: true,
              message: "Пожалуйста, заполните регион плательщика",
            }]}
          >
            <Input
              prefix={<FlagOutlined className="form__icon" />}
              placeholder="Область/штат/регион"
            />
          </Form.Item>

          <Form.Item
            name="billerPostalCode"
            rules={[{
              required: true,
              message: "Пожалуйста, заполните почтовый индекс получателя",
            }]}
          >
            <Input
              prefix={<MailOutlined className="form__icon" />}
              placeholder="Почтовый индекс/ZIP"
              pattern="[0-9]*"
            />
          </Form.Item>

          <Form.Item>
            <CountrySearch onChange={handleBillingCountryChange} />
          </Form.Item>

          <Form.Item>
            <h2>Банковская&nbsp;карта&nbsp;
              <Tooltip
                title="4242 4242 4242 4242 и любые реквизиты для тестовой оплаты"
                trigger={["click", "hover", "contextMenu"]}
                >
                  <QuestionCircleFilled />
              </Tooltip>
            </h2>
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
      </Spin>
    </ConfigProvider>
  );
}

export default PaymentDetails;
