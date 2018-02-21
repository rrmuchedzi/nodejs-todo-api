const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect("mongodb://localhost:27017/TodoApp", (error, client)=> {
    if(error) {
        return console.log("Failed to Connect : ", error);
    }
    const dbName = "TodoApp";
    console.log("MongoDB-FIND Connected successfully");

    // client.db(dbName).collection("Todo").find({
    //     _id: new ObjectID('5a8d589e69ef279d451dd2ab')
    // }).toArray()
    // .then( (result) => {
    //     console.log("Document Retrieved Successfully \n", JSON.stringify(result, undefined, 2));
    //     if( !result.completed ) {
    //         console.log("Task not yet completed")
    //     }
    // }, (error) => {
    //     console.log("Failed to retrieve the files from the database: ", error);
    // } )

    // client.db(dbName).collection("Todo").find().count()
    // .then( (countResult) => {
    //     console.log(`Todo List Has : ${countResult} Listed Available`);
    // }, (error) => {
    //     console.log("Failed to retrieve the files from the database: ", error);
    // })

    client.db(dbName).collection('Users').find({
        name: 'Rickson'
    }).toArray().then( ( queeryResult ) => {
        console.log(JSON.stringify(queeryResult, undefined, 2));
    }, (error) => {
        console.log( 'An error occued : ', error);
    });

    //client.close();
});