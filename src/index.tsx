import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/global.scss';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
console.log('STORE: ', store);
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
