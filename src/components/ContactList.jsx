// frontend/src/components/ContactList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, selectContacts, removeContact } from '../store/contactSlice';
// import Modal from 'react-modal';
import { Modal } from "./Modal/Modal";


const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleRemoveContact = (contactId) => {
    console.log('Removing contact with ID:', contactId);

    setSelectedContact(contactId);
    openModal();
  };

  const handleConfirmRemove = () => {
    dispatch(removeContact(selectedContact));
    closeModal(); // Close the modal after confirming removal
  };
  

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
  };

  return (
    <div className="container-class" >
      <h2>Contact List</h2>
      {contacts.length === 0 ? (
        <p className='red'>No contacts available.</p>
      ) : (
        <ul>
          {contacts.map((contact) => (
            <li key={contact._id}>
              {contact.name} - {contact.email} - {contact.phone}
              <button  onClick={() => handleRemoveContact(contact._id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}

      {/* React Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Remove Contact Modal"
        className="Modal"
      >
        <p>Are you sure you want to remove this contact?</p>
        <button onClick={handleConfirmRemove}>Yes</button>
        <button onClick={closeModal}>No</button>
      </Modal>
    </div>
  );
};

export default ContactList;
