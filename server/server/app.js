const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');
const Users = require('../models/users');
const cors = require('cors');

const app = express();
const PORT = 3005;

mongoose.connect('mongodb://localhost:27017/garaphqltest', {
  useNewUrlParser: true,
});

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));


const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(err));
dbConnection.once('open', () => console.log('Connected to DB!'));

app.listen(PORT, err => {
  err ? console.log(err) : console.log('Server started!');
});
