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
    return {
      dataSource: ds
    };
  },
  render: function () {
    var title = 'Title 1';
    return (
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
  _renderRow: function (rowData:String, rowId:Number) {
    return (
        <TodoView
            todo={rowData}
            update={updateTodo}
            />
    );
  },
  _fetchData: function () {
    getTodos(function (responseData) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData)
      });
    }.bind(this));
  }
});

var styles = StyleSheet.create({
  text: {
    fontSize: 30
  }, listStyle: {
    backgroundColor: '#1AD6FD'
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

function updateTodo(todo, cb) {
  var updateTodoApi = API.SERVER_PREFIX + API.UPDATE_TODO.api.replace(':id', todo.id);
  request
      .put(updateTodoApi)
      .send(todo)
      .set('contentType', 'application/json')
      .end(function (err, res) {
        console.log(res);
        if (cb) cb(res);
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