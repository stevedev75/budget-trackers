const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

 //const PORT = 3000;

const PORT = process.env.PORT || 3000;

mongoose.connect(
 // process.env.MONGODB_URI || 'mongodb://localhost/shielded-ridge-87332',
  process.env.MONGODB_URI || 'mongodb://localhost/budget',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

///Testing this below...//

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://stevedev75:Georgewismer1!@cluster0.yubyx.mongodb.net/budget?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("budget").collection("transactions");
  // perform actions on the collection object
  client.close();
});






const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// mongoose.connect("mongodb://localhost/budget", {
//  useNewUrlParser: true,
//  useFindAndModify: false
// });

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});