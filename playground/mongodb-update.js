const {MongoClient, ObjectID} = require('mongodb');

const updateDatabase = () => {
    MongoClient.connect( "mongodb://localhost:27017/TodoApp", (error, client) => {
        if(error) {
            return console.log("Error connecting to database");
        }

        console.log("Database connection is Active");
        const dbName = "TodoApp";
        const dbCollection = "Users";

        client.db(dbName).collection(dbCollection).findOneAndUpdate({
            _id: new ObjectID('5a8d4f891d8bf51d349386a9')
        }, {
            $set: {
                name: "Simbai Marozva"
            },
            $inc : {
                age: 1
            }
        }, {
            returnOriginal: false
        }).then( (successRes) => {
            console.log("Successfully Updated", successRes)
        }, (failureRes) => {
            console.log("Failed to update the record : ", failureRes);
        })

        client.close();
    });
}

updateDatabase();