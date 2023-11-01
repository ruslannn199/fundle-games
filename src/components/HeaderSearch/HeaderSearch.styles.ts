import Search from 'antd/es/input/Search';
import styled from 'styled-components';
import devices from '../../styles/Devices';

export const BaseHeaderSearch = styled(Search)`
  display: flex;
  height: 6.4rem;
  align-items: center;

  @media ${devices.md} {
    width: 20rem;
  }
`;