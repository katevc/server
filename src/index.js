require('dotenv').config();
const cors = require('cors')

//Express App Setup

//Initialization
const express = require('express')
const app = express()
const port = process.env.PORT || 3001;

const news_model = require('./news_model')
const config = require('./config')

app.use(cors())
app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

//get all current entries from database 
app.get('/', (req, res) => {
  console.log("GET invoked");
  news_model.getEntries()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

//add new entry to database
app.post('/entries', (req, res) => {
  news_model.createEntry(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.delete('/entries/:id', (req, res) => {
  console.log("TRIES TO DELETE");
  news_model.deleteEntry(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    console.log("DELETING");
    //console.log(req);
    res.status(500).send(error);
  })
})
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})