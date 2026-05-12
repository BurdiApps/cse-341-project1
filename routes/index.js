// Setting up the main router
// The /contacts route uses the routes defined in contacts.

const express = require('express');
const router = express.Router();

// route returns simple message 
router.get('/', (req, res) => { res.send('Hello! This is the main router, no UI here.'); });
router.use('/contacts', require('./contacts'));

module.exports = router;
