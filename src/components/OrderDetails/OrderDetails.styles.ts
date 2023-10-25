import { Flex } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import styled from 'styled-components';

export const OrderDetailsWrapper = styled(Flex)`
  padding: 1rem 5rem;
  border: 1px solid grey;
  border-radius: 2rem;
  width: 120rem;
  margin: 2rem;
  background-color: #fff;
`;

export const OrderDetailsDocumentId = styled(Paragraph)`
  margin: 0;
  font-size: 3rem;
`;

export const OrderDetailsTitle = styled.h2`
  font-size: 3rem;
`;

export const OrderDetailsSubTitle = styled.h3`
  font-size: 2.5rem;
  font-weight: normal;
  color: darkgrey;
  margin: 0;
`;
