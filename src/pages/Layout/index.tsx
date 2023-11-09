// Components
import { LayoutWrapper } from './Layout.styles';
import Header from '../../components/Header';
import NavigationMenuMobile from '../../components/NavigationMenuMobile';
// Routes
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Spinner from '../../components/Spinner';
import { useTypedSelector } from '../../hooks';

const AppLayout: React.FC = () => {
  const { Content, Footer } = LayoutWrapper;
  const { loadingQueue } = useTypedSelector((state) => (state.loader));
  const isLoading = !!loadingQueue.length;

  return (
    <LayoutWrapper>
      <Header />
      <Content>
        <Suspense fallback={<Spinner spinning />}>
          <Outlet />\
        </Suspense>
      </Content>
      <Footer>
        © Ruslan Kamenskiy {new Date().getFullYear()}
      </Footer>
      <NavigationMenuMobile />
    </LayoutWrapper>
  );
}

export default AppLayout;
