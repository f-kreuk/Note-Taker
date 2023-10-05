// below we import the necessary Node.js modules, including path for working with file paths, fs for reading/writing files, and uniqid for generating unique ids
const path = require('path'); 
const fs = require('fs'); 
const uuid = require('..helpers/uuid');

// export module
module.exports = (app) => {

    // below we define the GET route for "/api/notes" by constructing path to JSON file containing notes data, reading it and parsing into an onject, and responding with the JSON data from the file.
    app.get('/api/notes', (req, res) => {
        const dbFilePath = path.join(__dirname, '../db/db.json');
        const db = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
        res.json(db);
    });

    // below we define a POST route for "/api/notes"
    app.post('/api/notes', (req, res) => {
        // Construct path to JSON containing notes data
        const dbFilePath = path.join(__dirname, '../db/db.json');
        
        // this reads JSON file and parses it into object
        let db = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));

        // creates new note object with data received in request
        const userNote = {
            title: req.body.title,
            text: req.body.text,
            id: uuid(), // generates unique ID for new note
        };

        // adds new note to array of notes
        db.push(userNote);

        // writes updated array of notes back to JSON
        fs.writeFileSync(dbFilePath, JSON.stringify(db, null, 2), 'utf8');

        // responds to POST request with newly created note
        res.json(userNote);
    });

    // below we define a DELETE route for "/api/notes/:id"
    app.delete('/api/notes/:id', (req, res) => {
        // this constructs the path to JSON containing notes data
        const dbFilePath = path.join(__dirname, '../db/db.json');
        
        // reads contents of JSON and parses it into object
        let db = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));

        // filters out the note with specified ID to delete it
        const deleteNotes = db.filter((item) => item.id !== req.params.id);

        // writes filtered array back to JSON
        fs.writeFileSync(dbFilePath, JSON.stringify(deleteNotes, null, 2), 'utf8');

        // responds to DELETE request with the updated array
        res.json(deleteNotes);
    });
};
