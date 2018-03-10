const {
    MongoClient,
    ObjectID
} = require('mongodb');

const dbName = "TodoApp";
const dbCollection = 'gamers';

const databaseOperations = (writeFuction) => {
    MongoClient.connect("mongodb://localhost:27017/TodoApp", (error, client) => {
        if (error) {
            return console.log(`An error occurred. ${error}`);
        }

        console.log('Successfully connected');

        //Add to database
        writeFuction(client);
        client.close();

    });
};

const writeToDatabase = (client) => {
    client.db(dbName).collection(dbCollection).insertMany(
    [
        {
            name: "James",
            userID: "jimmy-crusher",
            age: 24,
            games: ['Street Fighter', 'Lord Of The Rings', 'PES 2019']
        },
        {
            name: "Sam",
            userID: "sam101",
            age: 23,
            games: ['Street Fighter', 'Punisher']
        },
        {
            name: "Tom",
            userID: "tomdriver",
            age: 25,
            games: ['Punisher']
        },
        {
            name: "Nancy",
            userID: "casual gamer",
            age: 24,
            games: ['Candy Crush', 'Punisher', 'Tetris']
        },
        {
            name: "Shona",
            userID: "gamba",
            age: 23,
            games: ['Mortal Kombat', 'Injustice', 'Street Fighter', 'Punisher']
        }
    ]).then((result) => {
        console.log(result);
    }, (error) => {
        console.log(error);
    });
};

const readPlayerNames = (client) => {
    client.db(dbName).collection(dbCollection)
    .find(
        {
            // $gt: { "$games": {$size: 2} } 
            // games: { $size: {$gt: 1} }
            // games: {$exists: true},
            // $where: "this.games.length>3"
        }
    )
    .toArray()
    .then((result)=> {
        result.forEach(element => {
            console.log(element.name);
        });
    }, (error) => {
        console.log(error);
    });
};

databaseOperations(readPlayerNames);