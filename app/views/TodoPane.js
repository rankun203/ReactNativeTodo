/**
 * Created on 10/4/15.
 * @author rankun203
 */

var React = require('react-native');
var request = require('superagent');
var TodoInput = require('./TodoInput/TodoInput');
var TodoList = require('./TodoList/TodoList');
var API = require('../network/API');

var {
    View,
    StyleSheet
    } = React;

var TodoPane = React.createClass({
  getInitialState: function () {
    return {
      todos: []
    };
  },
  render: function () {
    return (
        <View style={styles.container}>
          <TodoList
              ref={'TodoList'}
              todos={this.state.todos}
              onAddCompleted={this._clearTodoInput}
              style={styles.todoList}/>
          <TodoInput
              ref={'TodoInput'}
              onAddTodo={this._handleAddTodo}/>
        </View>
    );
  },
  _handleAddTodo: function (title) {
    this.refs.TodoList._handleAddTodo(title);
  },
  _clearTodoInput: function () {
    this.refs.TodoInput._clearInput();
  }
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  todoList: {
    flex: 1
  }
});

module.exports = TodoPane;