import {configureStore} from '@reduxjs/toolkit';
import appReducer from './appReducer';

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
