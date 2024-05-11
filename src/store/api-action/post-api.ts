import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { State, AppDispatch } from '../../types/state';

type TPost = {
  userId: number;
  id: number;
  title: string;
  body: string;  
}

export const fetchTPosts = createAsyncThunk<TPost[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'data/fetchQuests',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TPost[]>('posts');

    return data;
  },
);