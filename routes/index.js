// Setting up the main router
// The /contacts route uses the routes defined in contacts.

const express = require('express');
const router = express.Router();

// route returns simple message

router.use('/', require('./swagger'));
router.use('/contacts', require('./contacts'));

module.exports = router;