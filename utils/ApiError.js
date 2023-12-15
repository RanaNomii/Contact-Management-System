class ApiError extends Error {
    constructor(
        statusCode,
        message= "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

        if (stack) {
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

module.exports = ApiError;
// frontend/src/components/ContactList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/contacts')
      .then(response => setContacts(response.data))
      .catch(error => console.error('Error fetching contacts:', error));
  }, []);

  return (
    <div>
      <h2>Contact List</h2>
      <ul>
        {contacts.map(contact => (
          <li key={contact._id}>{contact.name} - {contact.email}  - {contact.phone}</li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const AddContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddContact = () => {
    axios.post('http://localhost:8000/api/contacts', { name, email, phone })
      .then(response => {
        console.log('Contact added successfully:', response.data);
        openSuccessModal();
      })
      .catch(error => {
        console.error('Error adding contact:', error);
        handleBackendError(error);
      });
  };

  const openSuccessModal = () => {
    setIsSuccessModalOpen(true);
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const handleBackendError = (error) => {
    console.error('Error from backend:', error.response.data.message);
    setErrorMessage(error.response.data.message);
    openErrorModal();
  };

  const openErrorModal = () => {
    setIsErrorModalOpen(true);
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  return (
    <div>
      <h2>Add Contact</h2>
<label>Name: <input type="text" value={name} onChange={e => setName(e.target.value)} /></label>
<label>Email: <input type="text" value={email} onChange={e => setEmail(e.target.value)} /></label>
<label>Phone: <input type="text" value={phone} onChange={e => setPhone(e.target.value)} /></label>
      {/* Your form inputs go here */}
      <button onClick={handleAddContact}>Add Contact</button>

      {/* Success Modal */}
      <Modal
        isOpen={isSuccessModalOpen}
        onRequestClose={closeSuccessModal}
        contentLabel="Success Modal"
        className="Modal"
      >
        <div>
          <p>Contact added successfully!</p>
          <button onClick={closeSuccessModal}>Close</button>
        </div>
      </Modal>

      {/* Error Modal */}
      <Modal
        isOpen={isErrorModalOpen}
        onRequestClose={closeErrorModal}
        contentLabel="Error Modal"
        className="Modal"
      >
        <div>
          <p>Error adding contact: {errorMessage}</p>
          <button className='close-btn {
' onClick={closeErrorModal}>Close</button>
        </div>
      </Modal>
    </div>
  );
};

// export default AddContactForm;

