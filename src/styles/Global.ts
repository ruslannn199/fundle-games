import { createGlobalStyle } from 'styled-components';

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
    --tan: #e0a96d;
    --orange: #fa0;
  }

  html {
    font-size: .521vw;
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
`;

export default GlobalStyle;
