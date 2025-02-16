import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '@/utils/AxiosInstance';
import axios from 'axios';

export const GetUser = createAsyncThunk('login/fetch', async (user, ApiThunk) => {
  const { rejectWithValue } = ApiThunk;

  try {
    const response = await axiosInstance.get('/user/info');

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

export const createLogin = createAsyncThunk('login/create', async (user, ApiThunk) => {
  const { rejectWithValue } = ApiThunk;

  try {
    const response = await axiosInstance.post('/yeshtery/token', user);

    if (response.data) {
      localStorage.setItem('authToken', response.data.token);
    }

    return response.data.userInfo;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

export const createLogout = () => {
  localStorage.removeItem('authToken');
  axios.defaults.headers.common['Authorization'] = "";
  window.location.href = '/';

}


const LoginSlice = createSlice({
  name: 'login',
  initialState: {
    isLoading: false,
    error: null,
    user: null,
  },
  reducers: {},
  extraReducers: (builder) => {

    builder
      .addCase(GetUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(GetUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // create
    builder
      .addCase(createLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createLogin.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
})

export default LoginSlice.reducer
