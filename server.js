// Dependencies

const express = require('express');
const path = require('path');
const fs = require('fs');

// Sets up the Express App

const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"))


// Routes



app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

// Displays all notes
app.get('/api/notes', (req, res) => {
    fs.readFile("./db/db.json",{encoding:"utf-8"},function(err,notesjson){
    res.json(JSON.parse(notesjson));
    })
    

});



// Create New notes - takes in JSON input
app.post('/api/notes', (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newNote = req.body;

  
  console.log(newNote);
  fs.readFile("./db/db.json",{encoding:"utf-8"},function(err,notesjson){
    const notes = JSON.parse(notesjson);
    notes.push(newNote);
    fs.writeFile("./db/db.json",JSON.stringify(notes),function(err,notesjson){
       res.json(newNote);
        })
    })
  
 
});

// Starts the server to begin listening

app.listen(process.env.PORT||PORT, () => console.log(`App listening on PORT ${PORT}`));
