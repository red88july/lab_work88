import {GlobalError, PostMutation, Posts} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {getPosts, postsCreate} from './postsThunk.ts';
import {RootState} from '../../../app/store.ts';

interface UsersState {
  posts: PostMutation | null;
  allPosts: Posts[];
  isLoadingPost: boolean;
  isErrorPost: GlobalError | null;
}

const initialState: UsersState = {
  posts: null,
  allPosts: [],
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

    builder.addCase(getPosts.pending, (state) => {
      state.isLoadingPost = true;
    });
    builder.addCase(getPosts.fulfilled, (state, {payload: data}) => {
      state.isLoadingPost = false;
      state.allPosts = data;
    });
    builder.addCase(getPosts.rejected, (state) => {
      state.isLoadingPost = false;
    });
  }
});

export const postsReducer = postsSlice.reducer;
export const isLoadPost = (state: RootState) => state.posts.isLoadingPost;
export const isErrorPost = (state: RootState) => state.posts.isErrorPost;
export const getAllPost = (state: RootState) => state.posts.allPosts;
