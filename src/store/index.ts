import { configureStore } from '@reduxjs/toolkit';
import { createApi } from './api.ts';
import { rootReducer } from './root-reducer.ts';
import { redirect } from './middleware/redirect.ts';

export const api = createApi();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    }).concat(redirect)
  )
});