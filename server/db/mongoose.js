var mongooseRef = require('mongoose');
mongooseRef.Promise = global.Promise;
mongooseRef.connect('mongodb://localhost:27017/TodoApp');

module.exports = mongooseRef;