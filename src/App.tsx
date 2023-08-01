import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Homepage from './pages/Homepage';
import Logo from './components/Logo';
import Wrapper from './components/Wrapper';

const { Header } = Layout;

const App: React.FC = () => (
  <Router>
    <Layout>
      <Header className='header'>
        <Wrapper>
          <Logo />
        </Wrapper>
      </Header>
    </Layout>
    <Homepage />
  </Router>
);

export default App;
