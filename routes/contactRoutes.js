// backend/routes/contactRoutes.js

const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModel.js');

// Get all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new contact
router.post('/', async (req, res) => {
  const { name, email, phone } = req.body;

  // Check if any required field is empty
  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Check if the contact already exists
  const existedContact = await Contact.findOne({
    $or: [{ name }, { phone }]
  });

  if (existedContact) {
    return res.status(400).json({ message: 'Contact with this email or phone already exists.' });
  }

  const newContact = new Contact({ name, email, phone });

  try {
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a contact by ID
router.delete('/:id', async (req, res) => {
  const contactId = req.params.id;

  try {
    // Find the contact by ID and remove it
    const deletedContact = await Contact.findOneAndDelete({ _id: contactId });

    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    res.status(204).end(); // 204 No Content indicates a successful deletion
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
