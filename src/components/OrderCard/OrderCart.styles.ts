import { Flex } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const OrderCardWrapper = styled(Flex)`
  width: 140rem;
  border: 1px solid grey;
  border-radius: 2rem;
  padding: 3rem;
  background-color: #fff;
`;

export const OrderCardNeutralLink = styled(Link)`
  font-size: 3rem;
  color: #000;

  &:hover {
    color: #000;
  }
`;

export const OrderCardTimestamp = styled(OrderCardNeutralLink)`
  font-size: 4rem;
  font-weight: bold;
`;

export const OrderCardDocumentId = styled(Paragraph)`
  color: var(--orange);
  font-size: 2rem;
  letter-spacing: 1px;
  cursor: pointer;

  &:hover {
    color: #000;
  }
`;

export const OrderCardTotal = styled(OrderCardNeutralLink)`
  font-size: 3rem;
  font-weight: bold;
`;

export const OrderCardItemsInfo = styled(Flex)`
  padding: 1rem;
`;

export const OrderCardItemsImage = styled.img`
  width: 12rem;
  height: 12rem;
  outline: 2px solid #ccc;
  border-radius: 2rem;
`;

export const OrderCardMore = styled.div`
  font-size: 4rem;
  background-color: lightgrey;
  color: grey;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  width: 12rem;
  height: 12rem;
  border-radius: 2rem;
  cursor: pointer;
`;
