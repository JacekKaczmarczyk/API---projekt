const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
require('dotenv/config');

app.use(bodyParser.json());

//Import routes
const tarkovammo = require('./routes/tarkovammo');
app.use('/tarkovammo', tarkovammo);

//Routes
app.get('/', (req,res) => {
    res.send('Homepage');
});
//Connect to db
mongoose.connect(process.env.DB_CONNECTION, () => 
    console.log('Connected to DB')
);
//Listen to the server
app.listen(3000);
module.exports = app;