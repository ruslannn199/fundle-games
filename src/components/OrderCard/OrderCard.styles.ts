import { Flex } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import devices from '../../styles/Devices';

export const OrderCardWrapper = styled(Flex)`
  width: 85%;
  gap: 2.5rem;
  border: 1px solid grey;
  border-radius: 2rem;
  padding: 2.4rem;
  background-color: #fff;

  @media ${devices.md} {
    gap: 1rem;
  }
`;

export const OrderCardNeutralLink = styled(Link)`
  font-size: 1.6rem;
  color: #000;

  &:hover {
    color: #000;
  }

  @media ${devices.sm} {
    font-size: 1.2rem;
  }
`;

export const OrderCardTimestamp = styled(OrderCardNeutralLink)`
  font-size: 2rem;
  font-weight: bold;

  @media ${devices.sm} {
    font-size: 1.6rem;
  }
`;

export const OrderCardDocumentId = styled(Paragraph)`
  color: var(--orange);
  font-size: 1.2rem;
  letter-spacing: 1px;
  cursor: pointer;

  &:hover {
    color: #000;
  }

  @media ${devices.sm} {
    font-size: 1rem;
  }
`;

export const OrderCardTotal = styled(OrderCardNeutralLink)`
  font-size: 1.6rem;
  font-weight: bold;

  @media ${devices.sm} {
    font-size: 1.25rem;
  }
`;

export const OrderCardItemsInfo = styled(Flex)`
  padding: 1rem;

  @media ${devices.md} {
    padding: 0;
  }
`;

export const OrderCardItemsImage = styled.img`
  width: 8rem;
  height: 8rem;
  outline: 2px solid #ccc;
  border-radius: 2rem;

  @media ${devices.sm} {
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 1.2rem;
  }
`;

export const OrderCardMore = styled.div`
  font-size: 2rem;
  background-color: lightgrey;
  color: grey;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  width: 8rem;
  height: 8rem;
  border-radius: 2rem;
  cursor: pointer;

  @media ${devices.sm} {
    font-size: 1.4rem;
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 1.2rem;
  }
`;
