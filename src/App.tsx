import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu, ConfigProvider } from 'antd';
import Homepage from './pages/Homepage';
import Logo from './components/Logo';
import Registration from './pages/Registration';
import Wrapper from './components/Wrapper';
import NavigationItems from './components/NavigationItems';
import { navTheme } from './utils/themes';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => (
  <Router>
    <Layout style={{height: '100%'}}>
      <Header className="header">
        <Wrapper className="header__wrapper">
          <Link to="/">
            <Logo />
          </Link>
          <ConfigProvider theme={navTheme}>
            <Menu mode="horizontal" items={NavigationItems} />
          </ConfigProvider>
        </Wrapper>
      </Header>
      <Content className="content">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </Content>
      <Footer>
        © Ruslan Kamenskiy 2023
      </Footer>
    </Layout>
  </Router>
);

export default App;
