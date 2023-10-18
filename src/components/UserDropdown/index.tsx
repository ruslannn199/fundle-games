// Hooks
import { useTypedSelector } from '../../hooks';
// Images
import LogoImg from '../../assets/images/logo.png';

const UserDropdown: React.FC = () => {
  const { currentUser } = useTypedSelector((state) => (state.user));

  return currentUser
    ? (
    <h3 className="nav__profile">
      <img src={currentUser.photoURL || LogoImg} alt="profile avatar" className="nav__img" />
      {currentUser.displayName || "User"}
    </h3>
    )
    : null;
}

export default UserDropdown;
