import React from 'react';

import { Provider } from 'mobx-react';
import store from 'store/index';
import AppRouter from './router';

export default () => (
  <Provider {...store}>
    <AppRouter />
  </Provider>
);
