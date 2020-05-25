const db = require("../db/db.json");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

module.exports = function(app) {
  app.get("/api/notes", function(req, res) {
    res.send(db);
  });

  app.post("/api/notes", function(req, res) {

    let noteId = uuidv4();
    let newNote = {
      id: noteId,
      title: req.body.title,
      text: req.body.text
    };

    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;

      const allNotes = JSON.parse(data);

      allNotes.push(newNote);

      fs.writeFile("./db/db.json", JSON.stringify(allNotes, null, 2), err => {
        if (err) throw err;
        res.send(db);
        console.log("Note created!")
      });
    });
  });

};