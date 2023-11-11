import { Card, Col, Image } from 'antd';
import styled from 'styled-components';
import devices from '../../styles/Devices';

export const ProductCardColumn = styled(Col)`
  @media ${devices.md} {
    width: 15rem;
  }
`;

export const ProductCardWrapper = styled(Card)`
  position: relative;
  width: 20rem;

  @media ${devices.sm} {
    width: 70%;
  }

  @media ${devices.xs} {
    width: 55%;
  }
`;

export const CardImage = styled(Image)`
  width: 20rem;

  @media ${devices.md} {
    width: 15rem;
  }

  @media ${devices.xs} {
    width: 10rem;
  }
`;
