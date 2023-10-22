import { Header } from 'antd/es/layout/layout';
import styled from 'styled-components';

export const HeaderWrapper = styled(Header)`
  background-color: #fff;
  box-shadow: 0 .2rem .4rem rgba(0, 0, 0, .1);
  margin-bottom: 1rem;
  height: 10rem;

  & * {
    line-height: normal;
  }
`;
