// contactSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create async thunk for fetching contacts
export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
  const response = await axios.get('http://localhost:8000/api/contacts');
  return response.data;
});
// Create async thunk for removing a contact
export const removeContact = createAsyncThunk('contacts/removeContact', async (contactId) => {
  try {
    // Move axios.delete inside the try block
    await axios.delete(`http://localhost:8000/api/contacts/${contactId}`);
    
    console.log('Deleting contact with ID:', contactId);

    // You can return contactId here if needed
    return contactId;

  } catch (error) {
    // Move the console.error statement here
    console.error('Error deleting contact:', error.message);

    // Rethrow the error to ensure it propagates
    throw error;
  }
});

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        localStorage.setItem('contacts', JSON.stringify(action.payload));
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(removeContact.pending, (state) => {
        // Optional: You can update state for pending removal if needed
      })
      .addCase(removeContact.fulfilled, (state, action) => {
        // Update state when removal is successful
        state.data = state.data.filter(contact => contact._id !== action.payload);
      })
      .addCase(removeContact.rejected, (state, action) => {
        // Optional: Handle removal failure if needed
      });
  },
});

export const { setData } = contactSlice.actions;

export default contactSlice.reducer;
export const selectContacts = (state) => state.contacts.data;
