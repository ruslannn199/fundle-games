import styled from 'styled-components';
import EllipseBackground from '../../assets/images/ellipse.png';

export const CartModalWrapper = styled.div`
  background-image: url(${EllipseBackground});
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  text-align: center;
  position: absolute;
  left: 35%;
  top: 5%;
  font-weight: bold;
  font-size: 2rem;
  overflow: hidden;
`;
