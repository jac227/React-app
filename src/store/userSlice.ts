import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface UserState {
  users: User[];
  selectedUser: User | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  users: [],
  selectedUser: null,
  status: 'idle',
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (page: number) => {
  const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
  return response.data.data;
});

export const fetchUserById = createAsyncThunk('users/fetchUserById', async (id: number) => {
  const response = await axios.get(`https://reqres.in/api/users/${id}`);
  return response.data.data;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchUserById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default userSlice.reducer;

