const mongoose = require('mongoose');

const server = 'localhost:27017';
const database = 'floatlinks';
const user = 'floatlinks';
const password = 'floatlinks';

mongoose.connect(`mongodb://${user}:${password}@${server}/${database}`);
module.exports = mongoose;