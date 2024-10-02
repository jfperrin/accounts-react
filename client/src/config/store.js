import { configureStore } from '@reduxjs/toolkit';
import createRootReducer from './rootReducer';

const store = configureStore({
  reducer: createRootReducer(),
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  enhancers: getDefaultEnhancers => {
    return getDefaultEnhancers();
  },
});

// module.hot.accept('./rootReducer', () => {
//   const newRootReducer = require('./rootReducer').default;
//   store.replaceReducer(newRootReducer);
// });

export default store;
