import { Flex } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import devices from '../../styles/Devices';

export const OrderDetailsItemWrapper = styled(Flex)`
  border-bottom: 1px solid #ccc;
  padding-bottom: 3rem;

  @media ${devices.md} {
    font-size: 1rem;
  }
`;

export const OrderDetailsItemImage = styled.img`
  width: 8rem;
  height: 8rem;

  @media ${devices.md} {
    width: 6rem;
    height: 6rem;
  }
`;

export const OrderDetailsItemImageLink = styled(Link)`
  display: flex;
  justify-content: center;
`;

export const OrderDetailsItemLink = styled(Link)`
  color: var(--orange);

  &:hover {
    color: var(--tan);
  }

  @media ${devices.md} {
    font-size: 1rem;
  }
`;

export const OrderDetailsItemBold = styled.b`
  font-size: 1.4rem;
  
  @media ${devices.md} {
    font-size: 1rem;
  }
`;

export const OrderDetailsItemInfo = styled(Flex)`
  width: 100%;
  gap: 4rem;
  padding: 0 1rem;

  @media ${devices.md} {
    gap: 2rem;
  }
`;

export const OrderDetailsItemAmount = styled.span`
  color: grey;
  font-size: 1.4rem;

  @media ${devices.md} {
    font-size: 1rem;
  }
`;
