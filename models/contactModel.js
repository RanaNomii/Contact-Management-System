// backend/models/contactModel.js

const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type:String,
    required:true,
    unique:true

  },
  email:{
    type:String,
    
  },

  phone:{
    type:String,
    required:true
  } 
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
