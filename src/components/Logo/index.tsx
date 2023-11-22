// Images
import LogoImg from '/images/logo.png';
// Styles
import { LogoImage, LogoTitle, LogoWrapper } from './Logo.styles';

const Logo: React.FC = () => (
  <LogoWrapper justify="center" align="center">
    <LogoTitle>Fundle&nbsp;Games</LogoTitle>
    <LogoImage src={LogoImg} alt="logo" />
  </LogoWrapper>
);

export default Logo;
