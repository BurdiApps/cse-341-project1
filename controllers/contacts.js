const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');

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

module.exports = { getAll, getSingle };
