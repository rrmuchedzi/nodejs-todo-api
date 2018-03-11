const {ObjectID} = require('mongodb');

const {mongooseRef} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

const id = '5aa51c9541f948410c4e8f8011';

// if(!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// })
// .then((res)=> {
//     console.log('Todos Found: ', res);
// });

// Todo.findOne({
//     _id: id
// })
// .then((todo) => {
//     console.log('\nSingle Todo', todo);
// });

// Todo.findById(id)
// .then((res) => {
//     console.log((!res) ? "Id Not Found" : res); 
// })
// .catch((err) => {
//     console.log('Error');
// });

User.findById('4aa52596084f171f40fd65af00')
.then( (res) => {
    console.log( (!res) ? 'No User Found in the collection' : res.email )
}).catch((err) => {
    console.log('Invalid User ID', null);
})