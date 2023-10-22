import { createGlobalStyle } from 'styled-components';
import OpenSansLightWoff from '../assets/fonts/OpenSans-Light.woff';
import OpenSansLightWoff2 from '../assets/fonts/OpenSans-Light.woff2';
import OpenSansRegularWoff from '../assets/fonts/OpenSans-Regular.woff';
import OpenSansRegularWoff2 from '../assets/fonts/OpenSans-Regular.woff2';
import OpenSansBoldWoff from '../assets/fonts/OpenSans-Bold.woff';
import OpenSansBoldWoff2 from '../assets/fonts/OpenSans-Bold.woff2';
import RobotoLightWoff from '../assets/fonts/Roboto-Light.woff';
import RobotoLightWoff2 from '../assets/fonts/Roboto-Light.woff2';
import RobotoRegularWoff from '../assets/fonts/Roboto-Regular.woff';
import RobotoRegularWoff2 from '../assets/fonts/Roboto-Regular.woff2';
import RobotoBoldWoff from '../assets/fonts/Roboto-Bold.woff';
import RobotoBoldWoff2 from '../assets/fonts/Roboto-Bold.woff2';
import SatisfyWoff from '../assets/fonts/Satisfy-Regular.woff';
import SatisfyWoff2 from '../assets/fonts/Satisfy-Regular.woff2';
import StyleScriptWoff from '../assets/fonts/StyleScript-Regular.woff';
import StyleScriptWoff2 from '../assets/fonts/StyleScript-Regular.woff2';

const Fonts = createGlobalStyle`
  @font-face {
    font-family: 'Open Sans';
    src: url(${OpenSansLightWoff2}) format('woff2'),
        url(${OpenSansLightWoff}) format('woff');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Open Sans';
    src: url(${OpenSansRegularWoff2}) format('woff2'),
        url(${OpenSansRegularWoff}) format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }


  @font-face {
    font-family: 'Open Sans';
    src: url(${OpenSansBoldWoff2}) format('woff2'),
        url(${OpenSansBoldWoff}) format('woff');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoBoldWoff2}) format('woff2'),
        url(${RobotoBoldWoff}) format('woff');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoLightWoff2}) format('woff2'),
        url(${RobotoLightWoff}) format('woff');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoRegularWoff2}) format('woff2'),
        url(${RobotoRegularWoff}) format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Style Script';
    src: url(${StyleScriptWoff2}) format('woff2'),
        url(${StyleScriptWoff}) format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Satisfy';
    src: url(${SatisfyWoff2}) format('woff2'),
        url(${SatisfyWoff}) format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
`;

export default Fonts;
