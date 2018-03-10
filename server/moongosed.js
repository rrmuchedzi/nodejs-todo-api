const mongoose = require('mongoose');

//mongooseRef.Promise = global.Promise();//Setup mongoose to use promises
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

const mongooseSchema = new mongoose.Schema({
    text: {
        type: String
    },
    completed: {
        type: Boolean
    }, 
    completedAt: {
        type: Number
    }
});

var todoModel = mongoose.model('Todo', mongooseSchema);

let newTodo = new todoModel({
    text: 'I will developing a Node JS Server side Application today',
    completed: false
});

newTodo.save()
.then( (res) => {
    console.log("Operation Result: ", res);
})
.catch( (err) => {
    console.log("Operation Result: ", err);
})