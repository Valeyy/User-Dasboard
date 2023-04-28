import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { StoreContext, store } from './api/state/stores/store';
import Routers from './Routers';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <Routers />
    </StoreContext.Provider>
  </React.StrictMode>
);