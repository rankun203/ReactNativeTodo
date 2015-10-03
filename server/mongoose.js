/**
 * Created on 10/3/15.
 * @author rankun203
 */

var mongoose = require('mongoose');

var uri = 'mongodb://localhost/rn_todo';

mongoose.connect(uri, function (err) {
  if (err) console.error('Mongo disconnected', err);
  else console.log('Mongo connected');
});
mongoose.connection.on('error', console.error.bind(console, 'connection error: '));

module.exports = mongoose;