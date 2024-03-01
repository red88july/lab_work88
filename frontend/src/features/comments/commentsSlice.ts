import { createSlice, } from '@reduxjs/toolkit';

import { Comment, GlobalErrorComment } from '../../types';

import { createComment } from './commentsThunk.ts';
import { RootState } from '../../../app/store.ts';

interface CommentsState {
  comments: Comment | null;
  isLoadingComment: boolean;
  isErrorComment: GlobalErrorComment | null;
}

const initialState: CommentsState = {
  comments: null,
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
  }
});

export const commentsReducer = commentsSlice.reducer;
export const isLoadComment = (state: RootState) => state.comments.isLoadingComment;
export const isErrComment = (state: RootState) => state.comments.isErrorComment;