import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import registerServiceWorker from './registerServiceWorker';
import createStore from './app/store/store';
import App from './app/components/App';

const history = createBrowserHistory();
const store = createStore(history);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
