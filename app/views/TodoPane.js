/**
 * Created on 10/4/15.
 * @author rankun203
 */

var React = require('react-native');
var request = require('superagent');
var KeyboardEvents = require('react-native-keyboardevents');
var TodoInput = require('./TodoInput/TodoInput');
var TodoList = require('./TodoList/TodoList');
var API = require('../network/API');

var KeyboardEventEmitter = KeyboardEvents.Emitter;

var {
    View,
    StyleSheet
    } = React;

var TodoPane = React.createClass({
  getInitialState: function () {
    KeyboardEventEmitter.on(KeyboardEvents.KeyboardDidShowEvent, (frames) => {
      console.log('keyboardSpace to sth');
      if (frames.end)
        this.setState({keyboardSpace: frames.end.height});
    });
    KeyboardEventEmitter.on(KeyboardEvents.KeyboardWillHideEvent, (frames) => {
      console.log('keyboardSpace to 0');
      this.setState({keyboardSpace: 0});
    });

    return {
      todos: [],
      keyboardSpace: 0
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
          <View style={{height: this.state.keyboardSpace}}></View>
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