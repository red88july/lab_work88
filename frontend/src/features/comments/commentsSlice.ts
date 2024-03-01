import { createSlice, } from '@reduxjs/toolkit';

import {Comment, CommentResponse, GlobalErrorComment} from '../../types';

import {createComment, getCommentsByPost} from './commentsThunk.ts';
import { RootState } from '../../../app/store.ts';

interface CommentsState {
  comments: Comment | null;

  commentsByPost: CommentResponse[];
  isLoadingCommentPost: boolean;

  isLoadingComment: boolean;
  isErrorComment: GlobalErrorComment | null;
}

const initialState: CommentsState = {
  comments: null,

  commentsByPost: [],
  isLoadingCommentPost: false,

  isLoadingComment: false,
  isErrorComment: null,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},

  extraReducers: (builder) => {

    builder.addCase(createComment.pending, (state) => {
      state.isLoadingComment = true;
      state.isErrorComment = null;
    });
    builder.addCase(createComment.fulfilled, (state, {payload: data}) => {
      state.isLoadingComment = false;
      state.comments = data;
    });
    builder.addCase(createComment.rejected, (state, {payload: error}) => {
      state.isLoadingComment = false;
      state.isErrorComment = error || null;
    });

    builder.addCase(getCommentsByPost.pending, (state) => {
      state.isLoadingCommentPost = true;
    });
    builder.addCase(getCommentsByPost.fulfilled, (state, {payload: data}) => {
      state.isLoadingCommentPost = false;
      state.commentsByPost = data;
    });
    builder.addCase(getCommentsByPost.rejected, (state) => {
      state.isLoadingCommentPost = false;
    });
  }
});

export const commentsReducer = commentsSlice.reducer;
export const isLoadComment = (state: RootState) => state.comments.isLoadingComment;
export const isErrComment = (state: RootState) => state.comments.isErrorComment;
export const selectCommentsByPost = (state: RootState) => state.comments.commentsByPost;