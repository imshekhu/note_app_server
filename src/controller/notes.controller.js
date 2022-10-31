const db = require("../database/connection")
const sequelize = require('sequelize');
const { validateNoteArray } = require('../utils/validators')
const Op = sequelize.Op;
Note = db.note;
const getAllNotes = async(req, res, next) =>{
    /*    Fetch all notes from the database
      Return an array of note objects
    */
    console.log(`[GET] http://localhost:${global.port}/notes - Fetching all notes`);

    // Used Javascript Promise.
    Note.findAll(
    )
    .then(function(notes){
        // Validation
        if (!validateNoteArray(notes)) {
            res.status(500).send('Invalid data type')
          }
        // Response
        res.send({notes});
    })
    .catch(function(err){
        // Error Catching
        console.log('Oops! something went wrong, : ', err);
        res.status(500).send('Fail to query')
      });
}

const findAllNotes = async(req, res, next) =>{
    /* 
      Given a search key
      Fetch all notes from the database that contains the search key in the note content
      Return an array of matching note objects

      Search key is sotred in variable searchKey
    */
    console.log(`[GET] http://localhost:${global.port}/notes/search - Searching notes`)
    // fetch the searchKey from query params
    const searchKey = req.params.searchKey
    // Used Javascript Promise.
    Note.findAll(
        // Use of Like in order to do fuzzy search
        {
            where: {
                text: {
                  [Op.like]: '%'+ searchKey +'%'
                }
              } 
        })
        .then(function(notes){
            // Validate data
            if (!validateNoteArray(notes)) {
                res.status(500).send('Invalid data type')
              }
            res.send({notes});
        })
        .catch(function(err){
            // catch Error and log to console
            console.log('Oops! something went wrong, : ', err);
            res.status(500).send('Fail to query')
          });

}

const deleteAllNotes = async(req, res, next) =>{
    /*
    Delete all notes from the database.
    */
    console.log(`[DELETE] http://localhost:${global.port}/notes - Deleting all notes`)

    // Used Javascript Promise.
    Note.destroy({
        where: {},
        truncate: true
      })
      .then(function(){
    // query validation
      res.send();

      })
      .catch(function(err){
        // catch Error and log to console
        console.log('Oops! something went wrong, : ', err);
        res.status(500).send('Fail to query')
      });
}

module.exports = {
    getAllNotes,
    findAllNotes,
    deleteAllNotes
}