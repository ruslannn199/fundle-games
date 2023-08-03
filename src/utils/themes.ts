import type { ThemeConfig } from 'antd';

const black = '#000000';
// const blackBrown = '#201e20';
// const beige = '#ddc3a5';
const orange = '#fa0';

export const navTheme: ThemeConfig = {
  token: {
    colorPrimary: orange,
  }
}

export const btnPrimaryTheme: ThemeConfig = {
  token: {
    colorPrimary: black,
  }
}

export const btnSecondaryTheme: ThemeConfig = {
  token: {
    colorPrimary: black,
    colorPrimaryBgHover: '#ccc',
  }
}
