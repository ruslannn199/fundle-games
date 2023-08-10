// Routes
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
// Pages
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
// Hooks
import { useEffect, useState } from 'react';
// Components
import { Layout, Menu, ConfigProvider, MenuProps } from 'antd';
import Logo from './components/Logo';
import Wrapper from './components/Wrapper';
import RegisterItems from './components/RegisterItems';
// Firebase
import { auth, handleUserProfile } from './utils/firebase.utils';
// Themes settings
import { orangeTheme } from './utils/themes';
import LoggedInNavItems from './components/LoggedInNavItems';
import { NavigationItemsLabels } from './types/enums';
// Types
import type { User } from 'firebase/auth';
import Recovery from './pages/Recovery';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const [navBar, setNavBar] = useState<string[]>([]);
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<boolean>(false);

  const clearActiveNavItem = (): void => (setNavBar((arr) => arr.filter((val) => !val)));

  const changeActiveNavItem: MenuProps['onClick'] = (e): void => {
    switch (e.key) {
      case NavigationItemsLabels.LOGIN:
      case NavigationItemsLabels.REGISTRATION:
        setNavBar([e.key]);
        break;
      default:
        clearActiveNavItem();
    }
  }

  useEffect(() => {
    try {
      auth.onAuthStateChanged(async (userAuth: User | null) => {
        if (!userAuth) {
          setUser(undefined);
        } else {
          const { uid, displayName, email } = userAuth;
          await handleUserProfile(userAuth, {
            id: uid,
            displayName,
            email,
          });
          setUser(userAuth);
        }
      });
    } catch (err) {
      setError(true);
    }
  }, [user]);

  return (
  <Router>
    <Layout style={{height: '100%'}}>
      <Header className="header">
        <Wrapper className="header__wrapper">
          <Link to="/">
            <Logo />
          </Link>
          <ConfigProvider theme={orangeTheme}>
            <Menu
              disabledOverflow={true}
              onClick={changeActiveNavItem}
              selectedKeys={user && navBar}
              mode="horizontal"
              items={user
                ? LoggedInNavItems({ photo: user.photoURL, name: user.displayName})
                : RegisterItems}
            />
          </ConfigProvider>
        </Wrapper>
      </Header>
      <Content className="content">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path={`/${NavigationItemsLabels.REGISTRATION}`}
            element={user ? <Navigate replace to='/' /> : <Registration />}
          />
          <Route
            path={`/${NavigationItemsLabels.LOGIN}`}
            element={user ? <Navigate replace to='/' /> : <Login />}
          />
          <Route
            path='/recovery'
            element={user ? <Navigate replace to='/' /> : <Recovery />}
          />
        </Routes>
      </Content>
      <Footer>
        © Ruslan Kamenskiy 2023
      </Footer>
    </Layout>
  </Router>
)};

export default App;
