import {GlobalError, User, ValidationError} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {login, registration} from './usersThunk.ts';
import {RootState} from '../../../app/store.ts';

interface UsersState {
  users: User | null;
  isLoadingUser: boolean;
  registrationError: ValidationError | null;
  isLoggingUser: boolean;
  falseLoggingUser: GlobalError | null;
}

const initialState: UsersState = {
  users: null,
  isLoadingUser: false,
  registrationError: null,
  isLoggingUser: false,
  falseLoggingUser: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.users = null;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(registration.pending, (state) => {
      state.isLoadingUser = true;
      state.registrationError = null;
    });
    builder.addCase(registration.fulfilled, (state, {payload: data}) => {
      state.isLoadingUser = false;
      state.users = data.user;
    });
    builder.addCase(registration.rejected, (state, {payload: error}) => {
      state.isLoadingUser = false;
      state.registrationError = error || null;
    });

    builder.addCase(login.pending, (state) => {
      state.isLoggingUser = true;
      state.falseLoggingUser = null;
    });
    builder.addCase(login.fulfilled, (state, {payload: data}) => {
      state.isLoggingUser = false;
      state.users = data.user;
    });
    builder.addCase(login.rejected, (state, {payload: error}) => {
      state.isLoggingUser = false;
      state.falseLoggingUser = error || null;
    });
  }
});

export const usersReducer = usersSlice.reducer;
export const {unsetUser} = usersSlice.actions;
export const selectUser = (state: RootState) => state.users.users;
export const isRegisterUser = (state: RootState) => state.users.isLoadingUser;
export const isRegisterError = (state: RootState) => state.users.registrationError;
export const isLoginUser = (state: RootState) => state.users.isLoggingUser;
export const isLoginError = (state: RootState) => state.users.falseLoggingUser;