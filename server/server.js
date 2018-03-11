const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();

app.use(bodyParser.json()); //Middleware

app.post('/todos', (req, res) => {
    let newTodo = new Todo({
        text: req.body.text
    });

    newTodo.save()
    .then((doc) => {
        res.send(doc);
    })
    .catch((err) => {
        console.log('Error Occured: ', err);
        res.status(400).send(err);
    });
});

app.listen(3000, () => {
    console.log(`Started listening at port : ${3000}`);
})

module.exports = app;