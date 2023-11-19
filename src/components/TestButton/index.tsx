// Components
import { Button } from 'antd';
// Hooks
import { useUserActions } from '../../hooks';
// Types
import { UserRoles } from '../../types/enums';
// Utils
import { handleGetTestUsers } from '../../redux/User/user.utils';

interface TestButtonProps {
  type: UserRoles;
}

const TestButton: React.FC<TestButtonProps> = ({ type }) => {
  const { emailSignInStart } = useUserActions();
  const handleTestAdminSignIn = async () => {
    try {
      const testData = await handleGetTestUsers(type);
      if (testData) {
        emailSignInStart(testData);
      }
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <Button
      type={type === UserRoles.ADMIN ? 'primary' : 'default'}
      onClick={handleTestAdminSignIn}
    >
      Test {type}
    </Button>
  );
}

export default TestButton;
