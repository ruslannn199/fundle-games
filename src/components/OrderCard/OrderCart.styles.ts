import { Flex } from 'antd';
import styled from 'styled-components';

export const OrderCardWrapper = styled(Flex)`
  width: 130rem;
  border: 1px solid grey;
  border-radius: 5rem;
  padding: 1rem;
`;

export const OrderCardItemsInfo = styled(Flex)`
  padding: 1rem;
`;

export const OrderCardItemsImage = styled.img`
  width: 16rem;
  height: 16rem;
`;

export const OrderCardMore = styled.div`
  background-color: lightgrey;
  color: grey;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  width: 16rem;
  height: 16rem;
  border-radius: 6rem;
  cursor: pointer;
`;
