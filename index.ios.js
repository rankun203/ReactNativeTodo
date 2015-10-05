/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
//var TodoList = require('./app/views/TodoList/TodoList');
var TodoPane = require('./app/views/TodoPane');
var SettingsPage = require('./app/views/Settings');
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
            ref='nav'
            style={styles.container}
            tintColor='#0BD318'
            initialRoute={{
              title: 'Fantastic Todo',
              component: TodoPane,
              rightButtonIcon: require('image!tabnav_settings'),
              onRightButtonPress: () => this.refs.nav.push({
                title: 'Settings',
                component: SettingsPage,
                rightButtonTitle: 'Cancel',
                onRightButtonPress: () => this.refs.nav.pop()
              })
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