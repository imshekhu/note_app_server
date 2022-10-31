const db = require("../database/connection")
const sequelize = require('sequelize');
const { validateNote } = require('../utils/validators')

Note = db.note;

const createNote = async (req, res) => {
    /*
    Given node content
    Create a new node and store the node to the database,
    Return the newly created note object

    Note content is stored in variable newText
    */
    console.log(`[POST] http://localhost:${global.port}/note - Storing a new note`);

    try {
        // Create
        const note = await Note.create({
          text: req.body["text"]
        });
        // Validation
        if (!validateNote(note)) {
            res.status(500).send('Invalid data type')
          }
        res.status(201).json({newNote: note});

    }
    catch (error) {
        // Error logging and response
        console.log(error);
        res.status(500).send('Fail to insert')
      }
    
};

const updateNote = async (req, res, next) => {
  /*
  Given note id and content
  Update the note's content with the given id in the database
  Return the updated note object
  Note id is stored in variable noteId
  Note content is stored in variable newText
  */
  console.log(`[PUT] http://localhost:${global.port}/note - Updating note`)
  // Fetch contents from body
  const noteId = req.body["id"]
	const newText = req.body["text"]
    try {
        // Start the operation of update
        updated_note = await Note.update(
            { text: newText
         },
            { where: { id : noteId } }
          );
        // fetch the updated note
        var updatedNote = await Note.findOne({
            where: {
              id: noteId
              
            }
          });
        // Validate
        if (!validateNote(updatedNote)) {
          // Failed Response
          res.status(500).send('Invalid data type')
          } 
          // Successful response
  	      res.send({ updatedNote });
    } catch (error) {
        // Failed Error
        console.log(error)
        res.status(500).json({ message: `Error : ${error}`})
    }
    
};

const deleteNote = async (req, res, next) => {

    /*
      Given a note id
		  Delete note with the given id from the database
		  Note id is stored in variable noteId 
	  */
    console.log(`[DELETE] http://localhost:${global.port}/note - Deleting note`)
    const noteId = req.body["id"]
    // remove the content from db
    await Note.destroy(
        {where: {
            id:noteId
        }}
    
        ).catch(error=>console.log(error))
        res.send()
}

module.exports = {
    createNote,
    updateNote,
    deleteNote
}