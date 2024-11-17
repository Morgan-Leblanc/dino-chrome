import ReactDOM from 'react-dom/client'; 
import { Provider } from 'react-redux';
import {store,persistor} from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
    <MantineProvider theme={{fontFamily: "PressStart2P"}}>
    <App />
    </MantineProvider>
    </PersistGate>
  </Provider>
);