// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {
    if (error) {
        return console.log("Unable to connect to the MongoDB Server");
    }
    const dbName = "TodoApp";
    console.log("Connected to Mongo");

    client.db('TodoApp').collection('Todo').insertOne({
        text: "Study MongoDB Management",
        completed: false
    }, (err, res) => {
        if (err) {
            return console.log("Something Went Wrong: ",err);
        }
        console.log(JSON.stringify(res.ops, undefined, 2));
    });

    client.close();
});