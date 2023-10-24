import { orange } from '../../utils/themes';
import { LoadingOutlined } from '@ant-design/icons';

const Spinner = <LoadingOutlined style={{
  fontSize: "4.8rem",
  color: orange,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
}} spin />;

export default Spinner;
