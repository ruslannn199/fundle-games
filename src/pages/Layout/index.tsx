// Components
import { LayoutWrapper } from './Layout.styles';
import Header from '../../components/Header';
import NavigationMenuMobile from '../../components/NavigationMenuMobile';
// Routes
import { Outlet } from 'react-router-dom';

const AppLayout: React.FC = () => {
  const { Content, Footer } = LayoutWrapper;

  return (
    <LayoutWrapper>
      <Header />
      <Content>
        <Outlet />
      </Content>
      <Footer>
        © Ruslan Kamenskiy {new Date().getFullYear()}
      </Footer>
      <NavigationMenuMobile />
    </LayoutWrapper>
  );
}

export default AppLayout;
