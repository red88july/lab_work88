import {GlobalError,  PostMutation} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {postsCreate} from './postsThunk.ts';
import {RootState} from '../../../app/store.ts';

interface UsersState {
  posts: PostMutation | null;
  isLoadingPost: boolean;
  isErrorPost: GlobalError | null;
}

const initialState: UsersState = {
  posts: null,
  isLoadingPost: false,
  isErrorPost: null,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(postsCreate.pending, (state) => {
      state.isLoadingPost = true;
      state.isErrorPost = null;
    });
    builder.addCase(postsCreate.fulfilled, (state, {payload: data}) => {
      state.isLoadingPost = false;
      state.posts = data;
    });
    builder.addCase(postsCreate.rejected, (state, {payload: error}) => {
      state.isLoadingPost = false;
      state.isErrorPost = error || null;
    });
  }
});

export const postsReducer = postsSlice.reducer;
export const selecPosts = (state: RootState) => state.posts.posts;