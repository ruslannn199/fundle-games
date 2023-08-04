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
// Types
import type { User } from 'firebase/auth';
import LoggedInNavItems from './components/LoggedInNavItems';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const [navBar, setNavBar] = useState<string>('');
  const [user, setUser] = useState<User>();

  const changeActiveNavItem: MenuProps['onClick'] = (e): void => {
    setNavBar(e.key);
  }

  useEffect(() => {
    auth.onAuthStateChanged((userAuth: User | null) => {
      if (!userAuth) {
        setUser(undefined);
      } else {
        const { uid, displayName, email } = userAuth;
        handleUserProfile(userAuth, {
          id: uid,
          displayName,
          email,
        });
        setUser(userAuth);
      }
    })
  }, [user]);

  return (
  <Router>
    <Layout style={{height: '100%'}}>
      <Header className="header">
        <Wrapper className="header__wrapper">
          <Link to="/" onClick={() => setNavBar('')}>
            <Logo />
          </Link>
          <ConfigProvider theme={orangeTheme}>
            <Menu
              disabledOverflow={true}
              onClick={changeActiveNavItem}
              selectedKeys={user && [navBar]}
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
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={
            user ? <Navigate replace to='/' /> :<Login />} />
        </Routes>
      </Content>
      <Footer>
        © Ruslan Kamenskiy 2023
      </Footer>
    </Layout>
  </Router>
)};

export default App;
