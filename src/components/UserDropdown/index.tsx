// Hooks
import { useTypedSelector } from '../../hooks';
// Images
import LogoImg from '../../assets/images/logo.png';
// Styles
import { UserDropdownImage, UserDropdownTitle } from './UserDropdown.styles';

const UserDropdown: React.FC = () => {
  const { currentUser } = useTypedSelector((state) => (state.user));

  return currentUser
    ? (
      <UserDropdownTitle>
        <UserDropdownImage src={LogoImg} alt="profile avatar" />
        {currentUser.displayName || "User"}
      </UserDropdownTitle>
    )
    : null;
}

export default UserDropdown;
