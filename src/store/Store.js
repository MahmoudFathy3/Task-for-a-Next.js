import { configureStore } from '@reduxjs/toolkit'
import LoginSlice from './reducers/Login/LoginSlice';

const Store = configureStore({
  reducer: {
    login: LoginSlice
  }
})

export default Store