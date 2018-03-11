var mongooseRef = require('mongoose');
mongooseRef.Promise = global.Promise;
mongooseRef.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = mongooseRef;