const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const mongoose = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

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

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos/:id', (req, res) => {
    let id = req.params.id;

    if( !ObjectID.isValid(id) ) {
        return res.status(404).send({result: 'ID Is Invalid'});
    }

    Todo.findById(id).then((todo) => {
        if(!todo) {
            res.status(404).send({recordError: 'No Such Record Exist'});
        }

        res.status(200).send({todo});
    }).catch( (err) => {
        res.status(404).send({errorCatched: 'An Error Occured'});
    }) 
});

app.listen(port, () => {
    console.log(`Started listening at port : ${port}`);
})

module.exports = app;