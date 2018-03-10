const mongoose = require('mongoose');
const tableName = 'Users';

const mongooseDBSchema = new mongoose.Schema({
    email: {
        type: String,
        minlength: [4, 'Email too short, Invalid'],
        required: [true, 'Email is required'],
        trim: true
    }
})

const tableUsersModel = mongoose.model( tableName, mongooseDBSchema);

module.exports = {User: tableUsersModel}