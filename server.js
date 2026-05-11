const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongodb = require('./db/connect');

const app = express();
const port = process.env.PORT || 8080;

console.log('MONGODB_URI exists?', !!process.env.MONGODB_URI);

app.use(express.json());
app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log('DB connection error:', err);
    process.exit(1);
  } else {
    app.listen(port, () => console.log(`Connected to DB and listening on ${port}`));
  }
});