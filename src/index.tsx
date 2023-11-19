// Styles
import Fonts from './styles/Fonts';
import GlobalStyle from './styles/Global';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
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
