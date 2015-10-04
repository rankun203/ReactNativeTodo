#!/usr/bin/env node
/**
 * Created on 10/3/15.
 * @author rankun203
 */

var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var consObj = require('./helper').constructObj;
var mongoose = require('./mongoose');
var Todo = require('./Todo');
var app = express();

app.use(bodyParser.json());
app.use(logger('dev'));

app.get('/todos', function (req, res, next) {
  var skip = req.query.skip || 0;
  var limit = req.query.limit || 100;
  Todo
      .find({})
      .skip(skip)
      .limit(limit)
      .exec(function (err, docs) {
        if (err) res.status(500);
        res.json(docs);
      });
});
app.post('/todos', function (req, res, next) {
  var title = req.body.title;
  var done = req.body.done;
  var dtl = req.body.dtl;

  var todo = new Todo({
    title: title,
    done: done,
    dtl: dtl
  });

  todo.save({title: title, done: done}, function (err, doc) {
    if (err) res.status(500);
    res.json(doc);
  });
});
app.delete('/todos/:id', function (req, res, next) {
  Todo.findByIdAndRemove(req.params.id, function (err, doc) {
    if (err) res.status(500);
    res.json(doc);
  });
});
app.put('/todos/:id', function (req, res, next) {
  console.log('update ' + req.params.id + ' to ', consObj(
      'title', req.body.title,
      'done', req.body.done
  ));
  Todo.findByIdAndUpdate(
      req.params.id,
      consObj(
          'title', req.body.title,
          'done', req.body.done
      ), function (err, doc) {
        if (err) res.status(500);
        res.json(doc);
      }
  )
  ;
});

var server = app.listen(3000, function () {
  console.log('App is running at http://localhost:3000');
});
