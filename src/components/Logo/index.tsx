import LogoImg from '../../assets/images/logo.png';

const Logo = () => (
  <div className="logo">
    <span className="logo__text">Fundle Games</span>
    <img src={LogoImg} alt="Logo image" className="logo__img" />
  </div>
);

export default Logo;
