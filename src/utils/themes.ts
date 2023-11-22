import type { ThemeConfig } from 'antd';

const black = '#000000';
export const orange = '#ffaa00';
const red = '#ff0000';

export const fontTheme: ThemeConfig = {
  token: {
    fontFamily: 'Open Sans, Roboto, sans-serif',
  }
}

export const orangeTheme: ThemeConfig = {
  token: {
    colorPrimary: orange,
    colorLink: orange,
    colorLinkHover: black,
  }
}

export const blackTheme: ThemeConfig = {
  token: {
    colorPrimary: black,
    colorLink: black,
    colorLinkHover: orange,
  }
}

export const redTheme: ThemeConfig = {
  token: {
    colorPrimary: red,
    colorLink: red,
    colorLinkHover: orange,
  }
}
