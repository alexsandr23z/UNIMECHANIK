import { combineReducers } from '@reduxjs/toolkit';
import postSlices from './slices/post-slices';


export const rootReducer = combineReducers({
  posts: postSlices,
});