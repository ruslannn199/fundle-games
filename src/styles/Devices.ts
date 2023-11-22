const breakpoints = {
  xs: '320px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
}

const devices = {
  xs: `only screen and (max-width: ${breakpoints.xs})`,
  sm: `only screen and (max-width: ${breakpoints.sm})`,
  md: `only screen and (max-width: ${breakpoints.md})`,
  lg: `only screen and (max-width: ${breakpoints.lg})`,
  xl: `only screen and (max-width: ${breakpoints.xl})`,
}

export default devices;
