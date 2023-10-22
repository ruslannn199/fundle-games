import { Menu } from 'antd';
import styled from 'styled-components';

const NavigationMenuWrapper = styled(Menu)`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: normal;

  && li {
    display: flex;
    align-items: center;
    height: 10rem;
  }
`;

export default NavigationMenuWrapper;
