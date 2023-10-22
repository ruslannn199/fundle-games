import styled from 'styled-components';
import EllipseBackground from '../../assets/images/ellipse.png';
import { Flex } from 'antd';

export const CartModalWrapper = styled(Flex)`
  background-image: url(${EllipseBackground});
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100%;
  text-align: center;
  position: absolute;
  left: 35%;
  top: 15%;
  font-weight: bold;
  font-size: 2rem;
`;
