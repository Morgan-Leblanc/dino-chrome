import ReactDOM from 'react-dom/client'; 
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <MantineProvider>
      <App />
    </MantineProvider>
  </Provider>
);