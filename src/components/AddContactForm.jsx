// AddContactForm.js
import React, { useState } from 'react';
import axios from 'axios';
// import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { Modal } from "./Modal/Modal";
import { fetchContacts } from '../store/contactSlice';  // Update the path

const AddContactForm = () => {
  const dispatch = useDispatch();

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
        // Dispatch fetchContacts after adding a contact
        dispatch(fetchContacts());
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
    <div className="container-class">
      <h2>Add Contact</h2>
  <label>
    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name of the person" />
  </label>
  <label>
    <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email of the person" />
  </label>
  <label>
    <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone number of the person" />
  </label>
  <button onClick={handleAddContact}>Add Contact</button>
      {/* Success Modal */}
      <Modal
        isOpen={isSuccessModalOpen}
        onRequestClose={closeSuccessModal}
        contentLabel="Success Modal"
      >
        <div>
          <p>Contact added successfully!</p>
          <button className='close-btn' onClick={closeSuccessModal}>Close</button>
        </div>
      </Modal>

      {/* Error Modal */}
      <Modal
        isOpen={isErrorModalOpen}
        onRequestClose={closeErrorModal}
        contentLabel="Error Modal"

      >
        <div>
          <p>Error adding contact: {errorMessage}</p>
          <button className='close-btn' onClick={closeErrorModal}>Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default AddContactForm;
