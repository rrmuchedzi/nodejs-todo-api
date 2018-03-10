const mongooseRef = require('mongoose');
const todoModelName = 'Todo';

const todoDatabaseSchema = new mongooseRef.Schema({
    text: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

const todoEntryModel = mongooseRef.model(todoModelName, todoDatabaseSchema);

module.exports = {Todo: todoEntryModel};