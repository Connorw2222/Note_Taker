//server set up and pathes 
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3005;

// Sets express to handle data parsing JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))

const db = fs.readFileSync(path.join(__dirname, 'db/db.json'), 'utf8');
const dbArray = JSON.parse(db)
console.log(dbArray)

//routes to html pages
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', function (req, res) {
    const db = fs.readFileSync(path.join(__dirname, 'db/db.json'), 'utf8');
    console.log(db)
    res.json(db)
});

//Post route for notes

//create new notes, write into JSON new notes
app.post('/api/notes', function (req, res) {
    const note = {
        title: req.body.title,
        text: req.body.text
    }
    // add note to array
    dbArray.unshift(note);

    fs.writeFileSync(path.join(__dirname, 'db/db.json'), JSON.stringify(dbArray));
    res.status(200).json(note)
});

//Displaying notes load on front end (work on it from the front end)
    //fetch request and create new elements. 
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, 'public/notes.html'));
    })


// Listener
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});

