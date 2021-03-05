const router = require('express').Router();
const notes = require('../db/db.json');
const fs = require('fs');
const uuid = require('uuid');


router.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        const getNotes = JSON.parse(data);
        res.json(getNotes);
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
        postNote.push(postITNote);
        fs.writeFile('./db/db.json', JSON.stringify(postNote), err => {
            if (err) throw err;
            res.send(notes)
        });
    });
});

router.delete('/notes/:id', (req, res) => {
    let deleteID = req.params.id;
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;

        const deleteNotes = JSON.parse(data);
        const delFilteredNote = deleteNotes.filter((note) => note.id != deleteID);

        fs.writeFile('./db/db.json', JSON.stringify(delFilteredNote), err => {
            if (err) throw err;
            res.send(notes);
        });
    });
});

module.exports = router;