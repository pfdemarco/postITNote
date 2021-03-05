const router = require("express").Router();
const path = require('path');

//index.html
router.get("/", (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    } catch (err) {
        res.status(500).end();
    }
});

// Notes page
router.get("/notes", (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    } catch (err) {
        res.status(500).end();
    }
});

// Redirect to index.html
router.get("*", (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    } catch (err) {
        res.status(500).end();
    }
});

module.exports = router;