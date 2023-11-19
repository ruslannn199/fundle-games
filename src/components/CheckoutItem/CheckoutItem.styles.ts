import { Flex } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import devices from '../../styles/Devices';

export const CheckoutItemWrapper = styled(Flex)`
  padding: 2rem;
  width: 70rem;

  @media ${devices.md} {
    width: 50rem;
    box-shadow: 0 .2rem .4rem rgba(0, 0, 0, .1);
  }

  @media ${devices.sm} {
    width: 30rem;
  }
`;

export const CheckoutItemThumbnail = styled.img`
  width: 6rem;
  height: 6rem;
`;

export const CheckoutItemTitle = styled(Link)`
  display: flex;
  align-items: center;
  width: 30rem;
  font-size: 1.4rem;
  letter-spacing: .6px;
  color: #000;
  gap: 2rem;

  &:hover,
  &:active {
    color: #000;
  }

  @media ${devices.sm} {
    width: 100%;
  }
`;

export const CheckoutItemCounter = styled(Flex)`
  padding: .5rem 1rem;
  border-radius: 2rem;
  background-color: var(--gray);
`;

export const CheckoutItemText = styled.h5`
  margin: 0;
  color: var(--gray);
  position: absolute;
  top: 100%;
  transform: translateX(-15%);
`;

export const CheckoutItemPrice = styled.h3`
  font-size: 1.6rem;
`;

export const CheckoutItemTrashcan = styled.img`
  width: 2rem;
  transition: all .3s;
  cursor: pointer;
`;
