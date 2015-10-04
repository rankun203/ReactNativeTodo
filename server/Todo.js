/**
 * Created on 10/3/15.
 * @author rankun203
 */

var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
  title: {type: String, required: true, minlength: 1},
  done: {type: Boolean, required: true, default: false},
  dtl: {type: Date, default: 1},
  created_at: {type: Data, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});

TodoSchema.pre('save', function (next) {
  now = new Date();
  this.update_at = now;
  next();
});

module.exports = mongoose.model('Todo', TodoSchema);
