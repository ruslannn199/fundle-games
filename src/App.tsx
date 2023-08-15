// Redux
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/User/user.actions';
// Routes
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Pages
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
// Hooks
import { useEffect } from 'react';
import { useUserActions } from './hooks';
// Hoc
import WithAuth from './hoc/withAuth';
// Components
import { Layout } from 'antd';
import { default as Header } from './components/Header';
// Firebase
import { auth, handleUserProfile } from './utils/firebase.utils';
import { onSnapshot } from 'firebase/firestore';
// Types
import { NavigationItemsLabels } from './types/enums';
import type { Unsubscribe, User } from 'firebase/auth';
import type { userMainInfo, userStateToProps } from './types/types';
import Dashboard from './pages/Dashboard';

const { Content, Footer } = Layout;

const App: React.FC = () => {
  const { setCurrentUser } = useUserActions();

  useEffect(() => {
    const authListener: Unsubscribe = auth.onAuthStateChanged(async (userAuth: User | null) => {
      if (!userAuth) {
        setCurrentUser(undefined);
      } else {
        const { uid, displayName, email, photoURL } = userAuth;
        const userRef = await handleUserProfile(userAuth, {
          id: uid,
          displayName,
          email,
          photoURL,
        });
        if (userRef) {
          onSnapshot(userRef, (snapshot) => {
            const user = snapshot.data() as userMainInfo;
            setCurrentUser(user);
          });
        }
        setCurrentUser(userAuth);
      }
    });
    return () => authListener();
  }, [setCurrentUser]);

  return (
  <Router>
    <Layout style={{height: "100%"}}>
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
            path="/recovery"
            element={<Recovery />}
          />
          <Route
            path="/dashboard"
            element={<WithAuth><Dashboard /></WithAuth>}
          />
        </Routes>
      </Content>
      <Footer>
        © Ruslan Kamenskiy 2023
      </Footer>
    </Layout>
  </Router>
)};

const mapStateToProps = ({ user }: userStateToProps) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch: any) => ({
  setCurrentUser: (user: userMainInfo) => dispatch(setCurrentUser(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
