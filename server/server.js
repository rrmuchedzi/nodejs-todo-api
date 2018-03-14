require('./config/config');

const express = require('express');
const lodash = require('lodash');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const mongoose = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
const port = process.env.PORT;

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
            return res.status(404).send({recordError: 'No Such Record Exist'});
        }

        res.status(200).send({todo});
    }).catch( (err) => {
        res.status(404).send({errorCatched: 'An Error Occured'});
    }) 
});

app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;

    if( !ObjectID.isValid(id) ){
        return res.status(404).send({result: "Invalid ID For Deletion"});
    }

    Todo.findByIdAndRemove(id)
    .then( (todo) => {
        if(!todo) {
            res.status(404).send({invalidRecord: "Record Does not exist"});
        }
        res.status(200).send({deleted: todo});
    }).catch( (err) => {
        res.status(400).send();
    });
});

app.patch("/todos/:id", (req, res) => { //Use patch for updating data. Remember you can use any for anything
    let id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    let body = lodash.pick(req.body, ['text', 'completed']); // Secure measure to ensure only properties to be updated are updated and nothing else. So we select those we need
    if(lodash.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime(); // Returns as JS Timestamp. Number of Miliseconds between January 1, 1970 and the specified date
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
    .then( (todo) => {
        if(!todo) {
            return res.status(404).send();
        }
        res.status(200).send({todo: todo});
    }).catch( (err) => res.status(400).send());

});

app.listen(port, () => {
    console.log(`Started listening at port : ${port}`);
})

module.exports = app;