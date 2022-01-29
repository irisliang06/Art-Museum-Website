// A static server using Node and Express
const express = require("express");
const cors = require("cors");
const sql = require("./sql");

const app = express();
app.use(cors());

// app.set('trust proxy', true);

app.use(function (request, response, next) {
  console.log("got request",request.url);
  next();
})

app.use(express.static(__dirname + "/frontend/build"));

//we need one to return a list of subjects
//we need one to return a list of universities
//we need one to return a list of videos based on a given subject
//we need one to return a list of videos based on a given univeristy

app.get("/getSubjects", async function (request, response, next) {
  let arr = await sql.all("SELECT subject FROM coursesTable");
  let res = [];
  for (let i = 0; i < arr.length; ++i) {
    if (!res.includes(arr[i].subject)) {
      res.push(arr[i].subject);
    }
  }
  response.send(JSON.stringify(res));
});

app.get("/getUniversities/:subject", async function (request, response, next) {
  let arr = await sql.all("SELECT university FROM coursesTable WHERE subject=?", [
    request.params.subject.toLowerCase()
  ]);
  let res = [];
  for (let i = 0; i < arr.length; ++i) {
    if (!res.includes(arr[i].university)) {
      res.push(arr[i].university);
    }
  }
  response.send(JSON.stringify(res));
});

app.get("/getVideos/:university/:subject", async function (request, response, next) {
  let arr = await sql.all("SELECT * FROM coursesTable WHERE subject=? AND university=?", [
    request.params.subject.toLowerCase(),
    request.params.university.toLowerCase()
  ]);
  response.send(JSON.stringify(arr));
});

app.get("/getVideosBySubject/:subject", async function (request, response, next) {
  let arr = await sql.all("SELECT * FROM coursesTable WHERE subject=?", [ request.params.subject.toLowerCase() ]);
  response.send(JSON.stringify(arr));
});

app.get("/getVideosByUniversity/:university", async function (request, response, next) {
  let arr = await sql.all("SELECT * FROM coursesTable WHERE university=?", [ request.params.university.toLowerCase() ]);
  response.send(JSON.stringify(arr));
});

app.use(function (request, response) {
  response.status(404);
  response.send("Cannot answer this request");
})

// listen for requests :)
const listener = app.listen(3000, () => {
  console.log("The static server is listening on port " + listener.address().port);
});
