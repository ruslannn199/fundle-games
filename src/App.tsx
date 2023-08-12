// Redux
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/User/user.actions';
// Routes
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Pages
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
// Hooks
import { useEffect, useState } from 'react';
// Components
import { Layout } from 'antd';
// Firebase
import { auth, handleUserProfile } from './utils/firebase.utils';
// Themes settings
import { NavigationItemsLabels } from './types/enums';
// Types
import type { User } from 'firebase/auth';
import Recovery from './pages/Recovery';
import { default as Header } from './components/Header';

const { Content, Footer } = Layout;

const App: React.FC = () => {
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    try {
      auth.onAuthStateChanged(async (userAuth: User | null) => {
        if (!userAuth) {
          setCurrentUser(null);
        } else {
          const { uid, displayName, email } = userAuth;
          await handleUserProfile(userAuth, {
            id: uid,
            displayName,
            email,
          });
          setCurrentUser(userAuth);
        }
      });
    } catch (err) {
      setError(true);
    }
  }, [setCurrentUser]);

  // TODO Implement navigation to main page if there's no user
  // Like user ? <Navigate replace to='/' />

  return (
  <Router>
    <Layout style={{height: '100%'}}>
      <Header />
      <Content className="content">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path={`/${NavigationItemsLabels.REGISTRATION}`}
            element={<Registration />}
          />
          <Route
            path={`/${NavigationItemsLabels.LOGIN}`}
            element={<Login />}
          />
          <Route
            path='/recovery'
            element={<Recovery />}
          />
        </Routes>
      </Content>
      <Footer>
        © Ruslan Kamenskiy 2023
      </Footer>
    </Layout>
  </Router>
)};

const mapStateToProps = ({ user }: any) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch: any) => ({
  setCurrentUser: (user: User) => dispatch(setCurrentUser(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
