import { Header } from 'antd/es/layout/layout';
import styled from 'styled-components';

export const HeaderWrapper = styled(Header)`
  background-color: #fff;
  box-shadow: 0 .2rem .4rem rgba(0, 0, 0, .1);
  margin-bottom: 1rem;
  position: fixed;
  width: 100%;
  top: 2.4rem;
  z-index: 3;

  & * {
    line-height: normal;
  }
`;
