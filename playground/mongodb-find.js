const {
    MongoClient,
    ObjectID
} = require('mongodb');

MongoClient.connect("mongodb://localhost:27017/TodoApp", (error, client) => {
    if (error) {
        return console.log("Failed to Connect : ", error);
    }
    const dbName = "TodoApp";
    console.log("MongoDB-FIND Connected successfully");

    // client.db(dbName).collection('Todo').deleteOne({
    //     text: "Study MongoDB Management"
    // })
    // .then((result)=> {
    //     console.log(result);
    // })

    // client.db(dbName).collection('Todo').findOneAndDelete({
    //     text: 'To register for the GYM'
    // }).then( (result) => {
    //     console.log(result);
    // }, (error) => {
    //     console.log(error);
    // });

    client.db(dbName).collection('Users').findOneAndReplace({
        _id: new ObjectID('5a8d65d769ef279d451dd434')
    }, {
        name: "Keanu",
        age: 55,
        location: "United States"
    }).then((deleteResult) => {
        console.log(deleteResult);
    }, (err) => {
        console.log("An error Occurred", err);
    });

    //client.close();
});