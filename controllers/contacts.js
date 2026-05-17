const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');

// GET all
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

// GET single
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

// POST — create
const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({
        message: 'All fields are required: firstName, lastName, email, favoriteColor, birthday.'
      });
    }
    const contact = { firstName, lastName, email, favoriteColor, birthday };
    const response = await mongodb.getDb().db('cse341').collection('contacts').insertOne(contact);
    if (response.acknowledged) return res.status(201).json({ id: response.insertedId });
    res.status(500).json({ message: 'Error creating contact.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT — update
const updateContact = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid contact id.' });
    }
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const userId = new ObjectId(req.params.id);
    const contact = { firstName, lastName, email, favoriteColor, birthday };
    const response = await mongodb
      .getDb()
      .db('cse341')
      .collection('contacts')
      .replaceOne({ _id: userId }, contact);
    if (response.modifiedCount > 0) return res.status(204).send();
    res.status(404).json({ message: 'Contact not found or no changes made.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const deleteContact = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid contact id.' });
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db('cse341')
      .collection('contacts')
      .deleteOne({ _id: userId });
    if (response.deletedCount > 0) return res.status(200).send();
    res.status(404).json({ message: 'Contact not found.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };