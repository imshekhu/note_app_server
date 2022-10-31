const express = require('express')
const router = express.Router()
const { validateNoteArray } = require('../utils/validators')
const noteController = require('../controller/notes.controller');

/* ------------------------ TODO-3 - START ------------------------ */
// Route to get all Notes
router.get('/', noteController.getAllNotes);
/* ------------------------ TODO-3 - END ------------------------ */

/* ------------------------ TODO-7 START ------------------------ */
// Given a search key, fetch all notes from the database that contains the search key in the note’s content. Return an array of matching notes. 
router.get('/search/:searchKey',  noteController.findAllNotes);
// NOTE: If the search api is hit without any query param, we should return all the data or route to main page. 
router.get('/search',  noteController.getAllNotes);
/* ------------------------ TODO-7 END ------------------------ */

/* ------------------------ TODO-8 START ------------------------ */
// Delete all notes from the database.
router.delete('/', noteController.deleteAllNotes);
/* ------------------------ TODO-8 END ------------------------ */



module.exports = router