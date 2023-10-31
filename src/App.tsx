// Components
import { ConfigProvider } from 'antd';
// Hooks
import { useEffect } from 'react';
import { useUserActions } from './hooks';
// Pages
import Layout from './pages/Layout';
// Persistor
import { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
// Routes
import { BrowserRouter as Router } from 'react-router-dom';
// Types
import { fontTheme } from './utils/themes';

const App: React.FC = () => {
  const { checkUserSession } = useUserActions();

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <PersistGate persistor={persistor}>
      <Router>
        <ConfigProvider theme={fontTheme}>
          <Layout />
        </ConfigProvider>
      </Router>
    </PersistGate>
)};

export default App;
