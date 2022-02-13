const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


// Route 1: Get all notes using: GET "/api/notes/fetchalluser" Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
        try {
                const notes = await Note.find({ user: req.user.id });
                res.json(notes);

        } catch (error) {
                console.error(error.message);
                res.status(500).send("Internal server error");
        }
})

// Route 2: Add a new Note using: POST "/api/notes/addnote" Login required
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

// Route 3: Update an existing Note using: PUT "/api/notes/updatenote/:id" Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {

        try {
                const { title, description, tag } = req.body;

                // Create a newNote object
                const newNote = {};
                if(title){
                        newNote.title = title
                }
                if(description){
                        newNote.description = description
                }
                if(tag){
                        newNote.tag = tag
                }

                // Find the note to be updated and update it
                let note = await Note.findById(req.params.id);
                if(!note){
                        return res.status(404).send("Not found")
                }

                 // Allow updation only if user owns this Note
                if(note.user.toString() !== req.user.id){
                        return res.status(401).send("Not allowed");
                }

                note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
                res.json({note});

        } catch (error) {
                console.error(error.message);
                res.status(500).send("Internal server error");
        }
})

// Route 4: Delete an existing Note using: DELETE   "/api/notes/deletenote/:id" Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

        try {

                // Find the note to be deleted and delete it
                let note = await Note.findById(req.params.id);
                if(!note){
                        return res.status(404).send("Not found")
                }

                // Allow deletion only if user owns this Note
                if(note.user.toString() !== req.user.id){
                        return res.status(401).send("Not allowed");
                }

                note = await Note.findByIdAndDelete(req.params.id);
                res.json({"Success": "Note has been deleted successfully", note: note});

        } catch (error) {
                console.error(error.message);
                res.status(500).send("Internal server error");
        }
})

module.exports = router