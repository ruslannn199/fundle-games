import { Form, Input } from 'antd';
import styled from 'styled-components';
import devices from '../../styles/Devices';

export const PaymentDetailsFormItem = styled(Form.Item)`
  display: flex;
  justify-content: center;
`;

export const PaymentDetailsInput = styled(Input)`
  width: 40rem;

  @media ${devices.sm} {
    width: 30rem;
  }
`;
