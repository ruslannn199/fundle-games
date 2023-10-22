// Styles
import Fonts from './styles/Fonts';
import GlobalStyle from './styles/Global';
// Components
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Redux
import { Provider } from 'react-redux';
import { store } from './redux/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <Provider store={store}>
      <Fonts />
      <GlobalStyle />
      <App />
    </Provider>
  </StrictMode>,
);
