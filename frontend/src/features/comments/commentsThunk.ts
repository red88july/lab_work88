import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store.ts';
import axiosApi from '../../axiosApi.ts';
import {Comment, CommentResponse, GlobalErrorComment} from '../../types';
import { isAxiosError } from 'axios';

export const createComment = createAsyncThunk<CommentResponse, Comment, { rejectValue: GlobalErrorComment, state: RootState }>(
  'comments/createComment',
  async (comments, {rejectWithValue, getState}) => {
    try {
      const token = getState().users.usersDetails?.user.token;
      const response =  await axiosApi.post('/comments', comments, {headers: { 'Authorization': 'Bearer ' + token}});
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  }
);

export const getCommentsByPost = createAsyncThunk<CommentResponse [], string>(
  'comments/commentsPost',
  async (id: string) => {
    const response = await axiosApi.get<CommentResponse []>('/comments?post=' + id);
    return response.data;
  }
);