import { Empty, Flex } from 'antd';
import styled from 'styled-components';
import devices from '../../styles/Devices';

export const CheckoutWrapper = styled(Flex)`
  padding: 0 1.5rem;

  @media ${devices.md} {
    gap: 2rem;
  }

  @media ${devices.sm} {
    padding: 0;
  }
`;

export const CheckoutTotalWrapper = styled(Flex)`
  width: 100%;
  font-size: 2.5rem;
  text-align: right;
`;

export const CheckoutTotal = styled.h2`
  font-size: 2.5rem;
  margin: 0;
`;

export const CheckoutEmpty = styled(Empty)`
  width: 70rem;
`;
