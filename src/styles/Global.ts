import { createGlobalStyle } from 'styled-components';
import OpenSansLightWoff from '/fonts/OpenSans-Light.woff';
import OpenSansLightWoff2 from '/fonts/OpenSans-Light.woff2';
import OpenSansRegularWoff from '/fonts/OpenSans-Regular.woff';
import OpenSansRegularWoff2 from '/fonts/OpenSans-Regular.woff2';
import OpenSansBoldWoff from '/fonts/OpenSans-Bold.woff';
import OpenSansBoldWoff2 from '/fonts/OpenSans-Bold.woff2';
import RobotoLightWoff from '/fonts/Roboto-Light.woff';
import RobotoLightWoff2 from '/fonts/Roboto-Light.woff2';
import RobotoRegularWoff from '/fonts/Roboto-Regular.woff';
import RobotoRegularWoff2 from '/fonts/Roboto-Regular.woff2';
import RobotoBoldWoff from '/fonts/Roboto-Bold.woff';
import RobotoBoldWoff2 from '/fonts/Roboto-Bold.woff2';
import SatisfyWoff from '/fonts/Satisfy-Regular.woff';
import SatisfyWoff2 from '/fonts/Satisfy-Regular.woff2';
import StyleScriptWoff from '/fonts/StyleScript-Regular.woff';
import StyleScriptWoff2 from '/fonts/StyleScript-Regular.woff2';

const GlobalStyle = createGlobalStyle`
  :root {
    --light-blue: #70d6ff;
    --lighter-blue: #3da6d0;
    --blue: #2f3c7e;
    --royal-blue: #234e70;
    --pink: #fbeaeb;
    --pale-yellow: #fbf8be;
    --beige: #ddc3a5;
    --black-brown: #201e20;
    --gray: #d7d7d7;
    --tan: #e0a96d;
    --orange: #fa0;
  }

  html {
    font-size: 10px;
  }

  html,
  body,
  #root {
    height: 100%;
    padding: 0;
    margin: 0;
  }

  body {
    font-family: 'Open Sans', 'Roboto', sans-serif;
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 1;
  }

  *, ::before, ::after {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
  }

  a, a:hover {
    transition: all .4s ease-in-out;
  }

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

export default GlobalStyle;
