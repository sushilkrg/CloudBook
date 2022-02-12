const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


// Rouite 1: Get all notes using: GET "/api/notes/fetchalluser" Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
        try {
                const notes = await Note.find({ user: req.user.id });
                res.json(notes);

        } catch (error) {
                console.error(error.message);
                res.status(500).send("Internal server error");
        }
})

// Rouite 2: Add a new Note using: POST "/api/notes/addnote" Login required
router.post('/addnote', fetchuser, [
        body('title', 'Please enter a valid title').isLength({ min: 3 }),
        body('description', 'Please enter something in description').isLength({ min: 5 })
], async (req, res) => {

        try {
                const { title, description, tag } = req.body;

                // If any errors, return Bad request and the errors
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return res.status(400).json({ errors: errors.array() });
                }

                const note = new Note({
                        title, description, tag, user: req.user.id
                })
                const savedNote = await note.save()

                res.json(savedNote);

        } catch (error) {
                console.error(error.message);
                res.status(500).send("Internal server error");
        }
})

module.exports = router