import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import ui from './ui';

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  ui,
});

