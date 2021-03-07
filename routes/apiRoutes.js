const router = require('express').Router();
const notes = require('../db/db.json');
const fs = require('fs');
const uuid = require('uuid');


router.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        const getNotes = JSON.parse(data);//The JSON.parse() method parses a JSON string, constructing the JavaScript value or object described by the string. 
                                          //An optional reviver function can be provided to perform a transformation on the resulting object before it is returned.
        res.json(getNotes);//The res.json() function sends a JSON response. 
                           //This method sends a response (with the correct content-type) 
                           //that is the parameter converted to a JSON string using the JSON.stringify() method.
    });
});

router.post('/notes', (req, res) => {
    let postID = uuid.v4();
    let postITNote = {
        id: postID,
        title: req.body.title,
        text: req.body.text,
    };

    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        const postNote = JSON.parse(data);
        postNote.push(postITNote);//The push() method adds one or more elements to the end of an array and returns the new length of the array.
        fs.writeFile('./db/db.json', JSON.stringify(postNote), err => {//The JSON.stringify() method converts a JavaScript object or value to a JSON string, 
                                                                       //optionally replacing values if a replacer function is specified or optionally including
                                                                       // only the specified properties if a replacer array is specified.
            if (err) throw err;
            res.send(notes)//post request to the page. Routes HTTP POST requests to the specified path with the specified callback functions. 
        });
    });
});

router.delete('/notes/:id', (req, res) => {
    let deleteID = req.params.id;
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;

        const deleteNotes = JSON.parse(data);
        const delFilteredNote = deleteNotes.filter((note) => note.id != deleteID);//The filter() method creates a new array with all elements 
                                                                                  //that pass the test implemented by the provided function.

        fs.writeFile('./db/db.json', JSON.stringify(delFilteredNote), err => {
            if (err) throw err;
            res.send(notes);
        });
    });
});

module.exports = router;