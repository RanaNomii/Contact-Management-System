import { configureStore } from '@reduxjs/toolkit';
import contactReducer from '../store/contactSlice';

 const store = configureStore({
  reducer: {
    contacts: contactReducer,
  },
});
export default store