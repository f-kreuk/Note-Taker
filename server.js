// Adding my dependency
const express = require('express');

// using express
const app = express();

// creating env variable port
const PORT = process.env.PORT || 3001;

// creates '/' route for every file in public folder
app.use(express.static('public'));

// Middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes for files
require('./routes/index')(app);
require('./routes/notes')(app);

// starts the server
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);