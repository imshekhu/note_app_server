const express = require('express')
const router = express.Router()
const { validateNote } = require('../utils/validators')
const noteController = require('../controller/note.controller');

/* ------------------------ TODO-4 START ------------------------- */
// Create New Note 
router.post('/', noteController.createNote);
/* ------------------------ TODO-4 END ------------------------- */

/* ------------------------ TODO-5 START ------------------------- */
// Given note id and content, update the note's content with the given id in the database. Return the updated note object. 
router.put('/', noteController.updateNote);
/* ------------------------ TODO-5 END ------------------------- */

/* ------------------------ TODO-6 START ------------------------- */
// Given note id, delete the note with the given id from the database.
router.delete('/', noteController.deleteNote);
/* ------------------------ TODO-6 END ------------------------- */

module.exports = router
