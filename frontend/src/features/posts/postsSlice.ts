import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GlobalError, PostMutation, Posts } from '../../types';
import { getPosts, postsCreate, viewOnePost } from './postsThunk.ts';
import { RootState } from '../../../app/store.ts';

interface UsersState {
  posts: PostMutation | null;
  allPosts: Posts[];
  post: Posts | null;
  isLoadingPost: boolean;
  isLoadingPosts: boolean;
  isErrorPost: GlobalError | null;
  isLoadViewPost: boolean;
}

const initialState: UsersState = {
  posts: null,
  allPosts: [],
  post: null,
  isLoadingPost: false,
  isLoadingPosts: false,
  isErrorPost: null,
  isLoadViewPost: false,
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
      state.isLoadingPosts = true;
    });
    builder.addCase(getPosts.fulfilled, (state, {payload: data}) => {
      state.isLoadingPosts = false;
      state.allPosts = data;
    });
    builder.addCase(getPosts.rejected, (state) => {
      state.isLoadingPosts = false;
    });

    builder.addCase(viewOnePost.pending, (state) => {
      state.isLoadViewPost = true;
    });
    builder.addCase(viewOnePost.fulfilled, (state, {payload: post}: PayloadAction<Posts>) => {
      state.isLoadViewPost = false;
      state.post = post;
    });
    builder.addCase(viewOnePost.rejected, (state) => {
      state.isLoadViewPost = false;
    });

  }
});

export const postsReducer = postsSlice.reducer;
export const isLoadPost = (state: RootState) => state.posts.isLoadingPost;
export const isErrorPost = (state: RootState) => state.posts.isErrorPost;

export const getAllPost = (state: RootState) => state.posts.allPosts;
export const isLoadPosts = (state: RootState) => state.posts.isLoadingPosts;

export const selectViewPost = (state: RootState) => state.posts.post;
