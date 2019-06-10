const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/db_crimestest', { useNewUrlParser: true }, (err) => {
  if (err) return console.log(err); // eslint-disable-line no-console
  console.log('Connected to the database'); // eslint-disable-line no-console
});

module.exports = mongoose;
