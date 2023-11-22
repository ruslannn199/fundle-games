import { Flex } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import styled from 'styled-components';
import devices from '../../styles/Devices';

export const OrderDetailsWrapper = styled(Flex)`
  padding: 1rem 5rem;
  border: 1px solid grey;
  border-radius: 2rem;
  width: 85%;
  margin: 2rem;
  background-color: #fff;
  font-size: 1.4rem;
  gap: 3rem;

  @media ${devices.md} {
    width: 90%;
    gap: 1.5rem;
    font-size: 1rem;
  }
`;

export const OrderDetailsTitle = styled.h2`
  font-size: 1.6rem;

  @media ${devices.md} {
    font-size: 1.2rem;
  }
`;

export const OrderDetailsDocumentId = styled(Paragraph)`
  font-size: 1.6rem;

  @media ${devices.md} {
    font-size: 1.2rem;
  }
`;

export const OrderDetailsDateInfo = styled(Flex)`
  gap: 3rem;

  @media ${devices.md} {
    gap: 1.5rem;
  }
`;

export const OrderDetailsSubTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: normal;
  color: darkgrey;
  margin: 0;

  @media ${devices.md} {
    font-size: 1rem;
  }
`;

export const OrderDetailsText = styled.span`
  font-size: 1.4rem;

  @media ${devices.md} {
    font-size: 1rem;
  }
`;
