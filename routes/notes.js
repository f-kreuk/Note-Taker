// Dependecy
const path = require('path');

// Defines the routes for the app:
module.exports = (app) => {

    // Sets up route for handling HTTP GET requests to the /notes endpoint
    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });

    // Sets up the wildcard route as a catch all to return index.html file
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    })
};