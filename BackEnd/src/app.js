const express = require('express');

const app = express();

//to test the server
app.get('/', (req, res) => {
    res.send('Server is running!');
})

module.exports = app;