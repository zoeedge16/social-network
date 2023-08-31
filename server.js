const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
// const { MongoClient } = require('mongodb');

const cwd = process.cwd();


const PORT = 3001;
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// once database is open then start listening for requests 
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server for social-network is running on port ${PORT}!`);
    });
});