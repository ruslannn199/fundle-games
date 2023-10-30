import { Card, Col, Image } from 'antd';
import styled from 'styled-components';

export const ProductCardColumn = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProductCardWrapper = styled(Card)`
  position: relative;
  width: 20rem;
`;

export const CardImage = styled(Image)`
  width: 20rem;
`;