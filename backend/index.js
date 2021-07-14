const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

// middleware
app.use(cors());

mongoose.connect('mongodb+srv://tony:tony@cluster0.z4uxv.mongodb.net/DB?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
    console.log('connected to db');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Now listening for requests on port 4000');
});