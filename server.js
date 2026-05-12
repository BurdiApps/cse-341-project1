// Set up Express server and connected to MongoDB
const express = require('express');
const mongodb = require('./db/connect');


const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use('/', require('./routes'));

// The server will only start listening after 
// the database connection is established
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => console.log(`Connected to DB and listening on ${port}`));
  }
});
