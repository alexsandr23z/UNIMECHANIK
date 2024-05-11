import { store } from '../store';
import { setError } from '../store/action';
import { createAsyncThunk } from '@reduxjs/toolkit';


const TIMEOUT_SHOW_ERROR = 2000;

export const clearErrorAction = createAsyncThunk(
  'error/setError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR
    );
  }
);

export const handleProcessError = (message: string): void => {
  store.dispatch(setError(message));
  store.dispatch(clearErrorAction());
};