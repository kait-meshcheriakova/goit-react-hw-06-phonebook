import { createSlice, nanoid } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
const contactInitialState = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactInitialState,
  reducers: {
    addContact: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(contact) {
        return {
          payload: {
            id: nanoid(),
            contact,
          },
        };
      },
    },

    removeContact: (state, action) => {
      const index = state.findIndex(contact => contact.id !== action.payload);
      state.splice(index, 1);
    },
  },
});
export const { addContact, removeContact } = contactsSlice.actions;
export const contactReducer = persistReducer(
  { key: 'contacts', storage },
  contactsSlice.reducer
);
