import { combineReducers } from '@reduxjs/toolkit';
import ui from '../redux/reducers/ui';

const createRootReducer = () =>
  combineReducers({
    ui,
  });

export default createRootReducer;
