// Import MongoDB and DB Connection and
// objectId from MongoDB from DB Connection
const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');

// Get all Contacts Endpoint and returns JSON
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db('cse341').collection('contacts').find();
    const contacts = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single Contact Endpoint and returns JSON
const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid contact id.' });
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('cse341').collection('contacts').find({ _id: userId });
    const contacts = await result.toArray();
    if (contacts.length === 0) return res.status(404).json({ message: 'Contact not found.' });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Exports endpoint logic so it can be used in routes
module.exports = { getAll, getSingle };
