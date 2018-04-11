import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import './styles/oreo-page.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers/root_reducer';

const store = createStore(reducers, applyMiddleware(ReduxPromise));

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
