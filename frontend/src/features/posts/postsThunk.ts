import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

import { RootState } from '../../../app/store.ts';

import axiosApi from '../../axiosApi.ts';
import {GlobalError, Post, PostMutation, Posts} from '../../types';

export const postsCreate = createAsyncThunk<PostMutation, Post, {  rejectValue: GlobalError, state: RootState }>(
  'posts/createPost',
  async (posted,  {rejectWithValue, getState}) => {

    try {
      const token = getState().users.usersDetails?.user.token;

      const formData = new FormData();
      const keys = Object.keys(posted) as (keyof Post)[];

      keys.forEach(key => {
        const value = posted[key];

        if (value !== null) {
          formData.append(key, value);
        }
      });

      const response = await axiosApi.post('/posts', formData, {headers: { 'Authorization': 'Bearer ' + token}});
      return response.data;

    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  }
);


export const getPosts = createAsyncThunk<Posts[]>(
  'posts/getPosts',
  async () => {
    const response = await axiosApi.get<Posts []>('/posts');
    return response.data;
  }
);