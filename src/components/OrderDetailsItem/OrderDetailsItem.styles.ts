import { Flex } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const OrderDetailsItemWrapper = styled(Flex)`
  border-bottom: 1px solid #ccc;
  padding-bottom: 3rem;
`;

export const OrderDetailsItemImage = styled.img`
  width: 12rem;
  height: 12rem;
`;

export const OrderDetailsItemImageLink = styled(Link)`
  display: flex;
  justify-content: center;
`;

export const OrderDetailsItemInfo = styled(Flex)`
  width: 80rem;
  padding: 0 1rem;
`;

export const OrderDetailsItemAmount = styled.span`
  color: grey;
  font-size: 2rem;
`;
