/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var TodoList = require('./app/views/TodoList/TodoList');
var {
    AppRegistry,
    StyleSheet,
    NavigatorIOS,
    View
    } = React;

var ReactNativeTodo = React.createClass({
  render: function () {
    return (
        <NavigatorIOS
            style={styles.container}
            tintColor='#FF6600'
            initialRoute={{
              title: 'Fantastic Todo',
              component: TodoList
            }}
            />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF'
  }
});

AppRegistry.registerComponent('reactNativeTodo', () => ReactNativeTodo);
module.exports = ReactNativeTodo;