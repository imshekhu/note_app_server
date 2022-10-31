const config = require('dotenv').config()
const cors = require('cors')
const express = require('express')

// Import mysql module
var mysql = require('mysql2');

const healthRouter = require("./routes/health")
const notesRouter = require("./routes/notes")
const noteRouter = require("./routes/note")

if (config.error) {
  throw config.error
}

const port = process.env.PORT // || 3001
global.port = port

const corsOptions ={
  origin:'*', 
  credentials:true,
  optionSuccessStatus:200,
}

const app = express()
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/*------------------------------------------TODO-1 START------------------------------------------*/
//  Setup Database connection


var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
/*------------------------------------------TODO-1 END------------------------------------------*/

/*------------------------------------------TODO-2 START------------------------------------------*/
//   Upon database connection success, create the relavent table(s) if it does not exist.

const db = require('./database/connection');
const Note = db.note

db.sequelize.sync({force: true}).then(() => {
  // This will drop all the tables and resync the db with new tables in models folder
  console.log('Drop and Resync Db');
  // Call the db for initial dummy data
  initial();
});
function initial() {
  // Add Dummy Data
  Note.create({
    id: 1,
    text: "This is dummy note text 1"
  });

  Note.create({
    id: 2,
    text: "this is dummy note text 2"
  });
}
// bootup

/*------------------------------------------TODO-2 END------------------------------------------*/

app.get('/', (req, res) => {
  res.send('CSBC1010 Assignment 3 - My Notes')
})

// Routes
app.use("/health", healthRouter)
app.use("/notes", notesRouter)
app.use("/note", noteRouter)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
