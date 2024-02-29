import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import {GlobalError, Login, LoginResponse, Registration, RegistrationResponse, ValidationError} from '../../types';
import {isAxiosError} from 'axios';

export const registration = createAsyncThunk<RegistrationResponse, Registration, {rejectValue: ValidationError}>(
  'users/registered',
  async (postUser, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post('/users', postUser);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  }
);

export const login = createAsyncThunk<LoginResponse, Login, {rejectValue: GlobalError}>(
  'users/login',
  async (loginUser, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post('/users/sessions', loginUser);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  }
);