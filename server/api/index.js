const exp = require("constants");
const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const path = require('path');

const dataJsonPath = path.join(__dirname, '..', 'data.json');


app.use(cors()); //cross origin for the frontend
app.use(express.json());

app.get("/api/people", (req, res) => {
  fs.readFile("data.json", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
      return;
    }
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseErr) {
      console.error(parseErr);
      res.status(500).send(parseErr);
    }
  });
});

//intai read -> JSON.parse -> write(JSON.stringify(... , err)) -> res.json()

app.post("/api/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send("Provide name");
  }
  fs.readFile(dataJsonPath, "utf-8", (readErr, data) => {
    if (readErr) {
      console.error(readErr);
      return res.status(500).send(readErr);
    }

    let peopleData = JSON.parse(data); // arrray cu toate persoanele dupa parsare
    //aici doar se foloseste push pt ca altfel returneaza lungimea array-ului
    peopleData.push({ name: name });
    fs.writeFile(dataJsonPath, JSON.stringify(peopleData), (writeErr) => {
      if (writeErr) {
        console.error(writeErr);
        return res.status(500).send(writeErr);
      }

      res.json({ name });
    });
  });
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
