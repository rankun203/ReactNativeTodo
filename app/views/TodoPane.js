/**
 * Created on 10/4/15.
 * @author rankun203
 */

var React = require('react-native');
var TodoInput = require('./TodoInput/TodoInput');
var TodoList = require('./TodoList/TodoList');

var {
    View,
    StyleSheet
    } = React;

var TodoPane = React.createClass({
  render: function () {
    return (
        <View style={styles.container}>
          <TodoList style={styles.todoList}/>
          <TodoInput />
        </View>
    );
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