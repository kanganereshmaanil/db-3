const express = require("express");
const app = express();

// const MongoClient = require("mongodb").MongoClient;
var mongoose = require("mongoose");

const url = "mongodb://127.0.0.1:27017/mongo";

var dbConnected;

mongoose.connect(url, (err, db) => {
  if (err) console.log(err);
  console.log("Connction Established");
});

const studentSchema = mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 15,
    max: 30,
  },
  batch: String,
});

const Student = mongoose.model("students", studentSchema);

app.get("/insertOne", function (req, res) {
  var student1 = new Student({
    name: "John",
    age: 10,
    batch: "Engineering",
  });

  student1.save((err, result) => {
    if (err) console.log(err);
    else {
      res.json(result);
    }
  });
});

app.get("/insertMany", function (req, res) {
  var student1 = new Student({
    name: "JohnA",
    age: 21,
    batch: "Engineering",
  });
  var student2 = new Student({
    name: "JohnB",
    age: 21,
    batch: "Engineering",
  });

  Student.insertMany([student1, student2]);
  res.json({ success: 1 });
});

app.get("/findAll", function (req, res) {
  Student.find({}, (err, result) => {
    if (err) console.log(err);
    else {
      res.json(result);
    }
  });
});

app.get("/deleteOne", function (req, res) {
  Student.deleteMany({ age: 21 }, (err, result) => {
    if (err) console.log(err);
    else {
      res.json(result);
    }
  });
});

app.get("/updateOne", function (req, res) {
  Student.updateMany(
    { age: 21 },
    {
      name: "Updated John",
    },
    (err, result) => {
      if (err) console.log(err);
      else {
        res.json(result);
      }
    }
  );
});

app.listen(4000);