// Components
import { Form, ConfigProvider, Flex, Tooltip } from 'antd';
import {
  FlagOutlined,
  HomeFilled,
  HomeOutlined,
  InsertRowRightOutlined,
  MailOutlined,
  QuestionCircleFilled,
  UserOutlined
} from '@ant-design/icons';
import CountrySearch from '../CountrySearch';
import PayButton from '../PayButton';
import PaymentDetailsSkeleton from '../PaymentDetailsSkeleton';
import CreditCard from 'react-credit-cards-2';
import CreditCardInput from '../CreditCardInput';
// Hooks
import React, { useState } from 'react';
import { useCreditCard, useOrdersActions, useTypedSelector, useWindowDimensions } from '../../hooks';
import { useNavigate } from 'react-router-dom';
// Styles
import { FormTitle } from '../../styles/Form';
import { CreditCardCVC, CreditCardExpiry } from '../CreditCardInput/CreditCardInput.styles';
import { PaymentDetailsFormItem as FormItem, PaymentDetailsInput } from './PaymentDetails.styles';
// Themes
import { orangeTheme } from '../../utils/themes';
// Types
import type { orderFields } from '../../types/types';

const PaymentDetails: React.FC = () => {
  const { loadingQueue } = useTypedSelector((state) => (state.loader));
  const { cartItems, total } = useTypedSelector((state) => (state.cartData));
  const { makePaymentStart } = useOrdersActions();
  const { width } = useWindowDimensions();
  const { creditCardData, setCreditCardData } = useCreditCard();
  const [recipientCountry, setRecipientCountry] = useState<string>('RU');
  const [billerCountry, setBillerCountry] = useState<string>('RU');
  const [form] = Form.useForm<orderFields>();
  const navigate = useNavigate();
  const isLoading = !!loadingQueue.length;

  const handleFormSubmit = (values: orderFields) => {
    const {
      recipientName, recipientCity, recipientLine1, recipientLine2, recipientPostalCode, recipientState,
      billerName, billerCity, billerLine1, billerLine2, billerPostalCode, billerState,
    } = values;
    const isValidTestCard = `${creditCardData.number}`.replaceAll(' ', '') === '4242424242424242';

    makePaymentStart({
      cardPaymentData: {
        billing: {
          card: creditCardData,
          billingDetails: {
            name: billerName,
            address: {
              city: billerCity,
              line1: billerLine1,
              line2: billerLine2,
              postalCode: billerPostalCode,
              state: billerState,
              country: billerCountry,
            }
          },
        },
        shipping: {
          name: recipientName,
          address: {
            city: recipientCity,
            line1: recipientLine1,
            line2: recipientLine2,
            postalCode: recipientPostalCode,
            state: recipientState,
            country: recipientCountry,
          }
        }
      },
      cartData: cartItems,
      total,
      success: isValidTestCard,
    });
    navigate(isValidTestCard ? '/success' : '/error');
  }

  const handleBillingCountryChange = (value: string) => {
    setBillerCountry(value);
  }

  const handleRecipientCountryChange = (value: string) => {
    setRecipientCountry(value);
  }

  return (
    <ConfigProvider theme={orangeTheme}>
      {
        isLoading
          ? (
            <PaymentDetailsSkeleton />
          )
          : (
            <Form
              id="payment"
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
              <FormItem
                name="recipientName"
                rules={[{ required: true, message: "Пожалуйста, заполните имя получателя" }]}
              >
                <PaymentDetailsInput prefix={<UserOutlined />} placeholder="ФИО получателя" />
              </FormItem>
              <FormItem
                name="recipientLine1"
                rules={[{ required: true, message: "Пожалуйста, заполните полный адрес получателя" }]}
              >
                <PaymentDetailsInput prefix={<HomeOutlined />} placeholder="Адрес 1 (или название компании)" />
              </FormItem>
              <FormItem name="recipientLine2">
                <PaymentDetailsInput
                  prefix={<HomeFilled />}
                  placeholder="Адрес 2 (необязательно)"
                />
              </FormItem>
              <FormItem
                name="recipientCity"
                rules={[{ required: true, message: "Пожалуйста, заполните город получателя" }]}
              >
                <PaymentDetailsInput prefix={<InsertRowRightOutlined />} placeholder="Город" />
              </FormItem>
              <FormItem
                name="recipientState"
                rules={[{ required: true, message: "Пожалуйста, заполните регион получателя" }]}
              >
                <PaymentDetailsInput prefix={<FlagOutlined />} placeholder="Область/штат/регион" />
              </FormItem>
              <FormItem
                name="recipientPostalCode"
                rules={[{ required: true, message: "Пожалуйста, заполните почтовый индекс получателя" }]}
              >
                <PaymentDetailsInput prefix={<MailOutlined />} placeholder="Почтовый индекс/ZIP" pattern="[0-9]*" />
              </FormItem>
              <FormItem>
                <CountrySearch onChange={handleRecipientCountryChange} />
              </FormItem>
              <FormTitle level={3}>Платёжный адрес</FormTitle>
              <FormItem
                name="billerName"
                rules={[{ required: true, message: "Пожалуйста, заполните ФИО плательщика" }]}
              >
                <PaymentDetailsInput prefix={<UserOutlined />} placeholder="ФИО плательщика" />
              </FormItem>
              <FormItem
                name="billerLine1"
                rules={[{ required: true, message: "Пожалуйста, заполните полный адрес плательщика" }]}
              >
                <PaymentDetailsInput prefix={<HomeOutlined />} placeholder="Адрес 1 (или название компании)" />
              </FormItem>
              <FormItem name="billerLine2">
                <PaymentDetailsInput prefix={<HomeFilled />} placeholder="Адрес 2 (необязательно)" />
              </FormItem>
              <FormItem
                name="billerCity"
                rules={[{ required: true, message: "Пожалуйста, заполните город плательщика" }]}
              >
                <PaymentDetailsInput prefix={<InsertRowRightOutlined />} placeholder="Город" />
              </FormItem>
              <FormItem
                name="billerState"
                rules={[{ required: true, message: "Пожалуйста, заполните регион плательщика" }]}
              >
                <PaymentDetailsInput prefix={<FlagOutlined />} placeholder="Область/штат/регион" />
              </FormItem>
              <FormItem
                name="billerPostalCode"
                rules={[{ required: true, message: "Пожалуйста, заполните почтовый индекс получателя" }]}
              >
                <PaymentDetailsInput prefix={<MailOutlined />} placeholder="Почтовый индекс/ZIP" pattern="[0-9]*" />
              </FormItem>
              <FormItem>
                <CountrySearch onChange={handleBillingCountryChange} />
              </FormItem>
              <FormItem>
                <h2>Банковская&nbsp;карта&nbsp;
                  <Tooltip
                    title="4242 4242 4242 4242 и любые реквизиты для тестовой оплаты"
                    trigger={["click", "hover", "contextMenu"]}
                    >
                      <QuestionCircleFilled />
                  </Tooltip>
                </h2>
                <Flex vertical={width < 768} gap="3rem">
                  <CreditCard
                    number={creditCardData.number}
                    name={creditCardData.name}
                    expiry={creditCardData.expiry}
                    cvc={creditCardData.cvc}
                  />
                  <Flex vertical gap="1rem" style={{ padding: "0 1rem" }}>
                    <CreditCardInput value={creditCardData.number} setter={setCreditCardData} name="number" />
                    <CreditCardInput value={creditCardData.name} setter={setCreditCardData} name="name" />
                    <Flex gap="1rem">
                      <CreditCardExpiry value={creditCardData.expiry} setter={setCreditCardData} name="expiry" />
                      <CreditCardCVC value={creditCardData.cvc} setter={setCreditCardData} name="cvc" />
                    </Flex>
                  </Flex>
                </Flex>
              </FormItem>
              <FormItem>
                <Flex justify="center">
                  <PayButton form={form} />
                </Flex>
              </FormItem>
            </Form>
          )
      }
    </ConfigProvider>
  );
}

export default PaymentDetails;
