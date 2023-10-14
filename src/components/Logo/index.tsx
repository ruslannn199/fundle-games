// Images
import LogoImg from '../../assets/images/logo.png';

const Logo: React.FC = () => (
  <div className="logo">
    <span className="logo__text">Fundle&nbsp;Games</span>
    <img src={LogoImg} alt="Logo" className="logo__img" />
  </div>
);

export default Logo;
