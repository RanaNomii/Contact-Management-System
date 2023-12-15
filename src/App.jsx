// frontend/src/App.js

import React from 'react';
import ContactList from './components/ContactList.jsx';
import AddContactForm from './components/AddContactForm.jsx';
import {Provider} from 'react-redux'
import store from '../src/store/store.js'
import './App.css';
import './index.css'


function App() {
  return (
    <Provider store={store}>
    
    <div className="App container">
      <h1>Contact Management System</h1>
      <AddContactForm />
      <ContactList />
    </div>
    </Provider>
  );
}

export default App;
