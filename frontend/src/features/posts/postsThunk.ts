import {createAsyncThunk} from '@reduxjs/toolkit';
import {GlobalError, Post, PostMutation} from '../../types';
import axiosApi from '../../axiosApi.ts';
import {isAxiosError} from 'axios';
import {RootState} from '../../../app/store.ts';


export const postsCreate = createAsyncThunk<PostMutation, Post, {  rejectValue: GlobalError, state: RootState }>(
  'posts/createPost',
  async (posted,  {rejectWithValue, getState}) => {
    try {
      const token = getState().users.users?.token;

      console.log(token);

      if(!token) {
        return {message: 'Token Not found'};
      }

      const response = await axiosApi.post('/posts', posted, {headers: { 'Authorization': `Bearer:${token}`}});
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  }
);