const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ehome', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function() {
    console.log('mongoose connect success')
});

module.exports = connection