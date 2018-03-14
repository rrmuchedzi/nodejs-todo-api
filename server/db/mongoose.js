var mongooseRef = require('mongoose');
mongooseRef.Promise = global.Promise;
mongooseRef.connect(process.env.MONGODB_URI);

module.exports = mongooseRef;