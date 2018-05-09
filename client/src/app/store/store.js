import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import reducers from '../reducers/reducers';

export default function (history) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    reducers,
    composeEnhancers(
      applyMiddleware(routerMiddleware(history), thunk),
    ),
  );
}
