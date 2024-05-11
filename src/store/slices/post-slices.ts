import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchTPosts } from '../api-action/post-api';

export type TPost = {
  userId: number;
  id: number;
  title: string;
  body: string;  
}

type TQuestsState = {
  posts: TPost[];
  isLoading: boolean;
  sort: boolean;
}

const initialState: TQuestsState = {
  posts: [],
  isLoading: false,
  sort: false,
};

const postsSlices = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    sortPosts(state, action: PayloadAction<boolean>) {
      state.sort = action.payload
      state.posts.sort((a, b) => { 
        return state.sort === false ? a.id - b.id : b.id - a.id;
      })
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isLoading = false;
      });
  }
});

export const { sortPosts } = postsSlices.actions;
export default postsSlices.reducer;

