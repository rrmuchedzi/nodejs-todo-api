const express = require('express');
const bodyParser = require('body-parser');

var mongoose = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = 3000;

app.use(bodyParser.json()); //Middleware

app.post('/todos', (req, res) => {
    let newTodo = new Todo({
        text: req.body.text
    });

    newTodo.save()
    .then((doc) => {
        res.status(201).send(doc);
    })
    .catch((err) => {
        console.log('Error Occured: ', err);
        res.status(400).send(err);
    });
});

app.listen(port, () => {
    console.log(`Started listening at port : ${port}`);
})