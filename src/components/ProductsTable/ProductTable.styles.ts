import { Image } from 'antd';
import styled from 'styled-components';
import devices from '../../styles/Devices';

export const ProductTableImage = styled(Image)`
  width: 20rem;

  @media ${devices.md} {
    width: 10rem;
  }
`;
