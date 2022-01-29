'use strict'

const sql = require('sqlite3');
const util = require('util');
const fs = require('fs');

const db = new sql.Database("courses.db");

db.run = util.promisify(db.run);
db.get = util.promisify(db.get);
db.all = util.promisify(db.all);

const readFile = util.promisify(fs.readFile);

async function readConvertFile() {
    const fileName = "convert.json";
    let content = await readFile(fileName);
    return JSON.parse(content);
};

function checkField(x) {
    if (x === null) {
      return "";
    }
    return x;
}

async function insertCourse(x) {
    await db.run(
      "INSERT INTO coursesTable (subject, url, thumbnail, title, university, professor) VALUES (?, ?, ?, ?, ?, ?)",
      [checkField(x.subject).trim().toLowerCase(), checkField(x.url).trim(), checkField(x.thumbnail).trim(), checkField(x.title).trim(), checkField(x.university).trim().toLowerCase(), checkField(x.professor).trim()  ]
    );
};

async function resetTable() {
    await db.run("DROP TABLE IF EXISTS coursesTable");
    await db.run("CREATE TABLE coursesTable ( subject TEXT, url TEXT, thumbnail TEXT, title TEXT, university TEXT, professor TEXT )");
    let obj = await readConvertFile();
    for (let x = 0; x < obj.length; ++x) {
      await insertCourse(obj[x]);
    }
};

module.exports = db;
resetTable();