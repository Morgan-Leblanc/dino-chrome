import './i18n';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import App from './App';

const theme = createTheme({
  fontFamily: 'PressStart2P, monospace',
  primaryColor: 'cyan',
  radius: { sm: '4px', md: '8px', lg: '12px' },
  defaultRadius: 'md',
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </PersistGate>
  </Provider>
);