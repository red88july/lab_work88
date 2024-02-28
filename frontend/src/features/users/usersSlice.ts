import {User, ValidationError} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {registration} from './usersThunk.ts';
import {RootState} from '../../../app/store.ts';

interface UsersState {
  users: User | null;
  isLoadingUser: boolean;
  registrationError: ValidationError | null;
}

const initialState: UsersState = {
  users:  null,
  isLoadingUser: false,
  registrationError: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},

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

  }
});

export const usersReducer = usersSlice.reducer;
export const isRegisterUser = (state:RootState) => state.users.isLoadingUser;
export const isRegisterError = (state: RootState) => state.users.registrationError;