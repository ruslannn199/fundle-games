// Components
import { ConfigProvider } from 'antd';
// Hooks
import { useEffect } from 'react';
import { useUserActions } from './hooks';
// Persistor
import { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
// Routes
import { RouterProvider } from 'react-router-dom';
// Types
import { fontTheme } from './utils/themes';
import { router } from './utils/router';

const App: React.FC = () => {
  const { checkUserSession } = useUserActions();

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <PersistGate persistor={persistor}>
      <ConfigProvider theme={fontTheme}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </PersistGate>
)};

export default App;
