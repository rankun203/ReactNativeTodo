/**
 * Created on 9/30/15.
 * @author rankun203
 */

'use strict';

var React = require('react-native');
var request = require('superagent');
var TodoView = require('./Todo');
var API = require('../../network/API');

var {
    Text,
    View,
    ListView,
    StyleSheet
    } = React;

var TodoListView = React.createClass({
  getInitialState: function () {
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    var todos = this.props.todos || [];
    return {
      dataSource: ds.cloneWithRows(todos),
      todos: todos
    };
  },
  render: function () {
    return (
      // List 的每一个元素应该有个 id, 才能用来鉴别
        <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            initialListSize={20}
            style={styles.listStyle}
            />
    );
  },
  componentDidMount: function () {
    this._fetchData();
  },
  _renderRow: function (rowData:String, sectionId:Number, rowId:Number) {
    return (
        <TodoView
            todo={rowData}
            onUpdate={this._updateTodo}
            rowId={rowId}
            />
    );
  },
  _updateTodo: function (rowId, todo, cb) {

    updateTodo(todo, cb)
  },
  _fetchData: function () {
    getTodos(function (responseData) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData),
        todos: responseData
      });
    }.bind(this));
  },
  _handleAddTodo: function (title) {
    var todo = {
      title: title,
      done: false
    };

    var todos = this.state.todos;
    todos.push(todo);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(todos),
      todos: todos
    });

    var onAddCompleted = this.props.onAddCompleted;
    addTodo(todo, (data) => {
      console.log('Todo ' + title + ' added');
      if (onAddCompleted) onAddCompleted();

      for (let k in data) todo[k] = data[k];
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(todos),
        todos: todos
      });
    });
  }
});

var styles = StyleSheet.create({
  text: {
    fontSize: 30
  }, listStyle: {
    backgroundColor: '#4CD964'
  }
});

function getTodos(cb) {
  var getTodosApi = API.SERVER_PREFIX + API.GET_TODOS.api;
  console.log('Loading todos from ' + getTodosApi);
  fetch(getTodosApi)
      .then((response) => response.json())
      .then(cb)
      .catch((error) => {
        console.warn(error);
      });
}

function addTodo(todo, cb) {
  var addTodoApi = API.SERVER_PREFIX + API.POST_TODO.api;
  request.post(addTodoApi)
      .send(todo)
      .set('contentType', 'application/json')
      .end(function (err, res) {
        if (err) console.error(err);
        else {
          var data = JSON.parse(res.text);
          console.log(data);
          if (cb) cb(data);
        }
      });
}

function updateTodo(todo, cb) {
  var updateTodoApi = API.SERVER_PREFIX + API.UPDATE_TODO.api.replace(':id', todo.id);
  request
      .put(updateTodoApi)
      .send(todo)
      .set('contentType', 'application/json')
      .end(function (err, res) {
        if (err) console.error(err);
        else {
          var data = JSON.parse(res.text);
          console.log(data);
          if (cb) cb(data);
        }
      });
}

function deleteTodo(id, cb) {

}

function markDone(id, cb) {
  updateTodo({
    _id: id,
    done: true
  }, cb);
}

module.exports = TodoListView;