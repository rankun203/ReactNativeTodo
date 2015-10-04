/**
 * Created on 10/4/15.
 * @author rankun203
 */

'use strict';

var React = require('react-native');
var Button = require('react-native-button');
var {
    View,
    TextInput,
    StyleSheet
    } = React;

var TodoInput = React.createClass({
  getInitialState: function () {
    var title = this.props.title || '';
    return {
      title: title
    };
  },
  render: function () {
    return (
        <View style={styles.inputBox}>
          <TextInput
              style={styles.textInput}
              value={this.state.title}
              autoFocus={true}
              onChangeText={this._handleChange}
              onSubmitEditing={this._handleSubmitPress}
              />
          <Button
              onPress={this._handleSubmitPress}
              returnKeyType='done'
              style={styles.submitButton}>Add</Button>
        </View>
    );
  },
  _handleChange: function (value) {
    this.setState({title: value});
  },
  _handleSubmitPress: function () {
    if (/^\s*$/.test(this.state.title)) return;

    console.log('Pressed ', this.state.title);
    this.props.onAddTodo(this.state.title);
  },
  _clearInput: function () {
    this.setState({
      title: ''
    });
  }
});

var styles = StyleSheet.create({
  inputBox: {
    flexDirection: 'row',
    backgroundColor: '#48D155'
  },
  textInput: {
    height: 40,
    margin: 5,
    padding: 5,
    borderColor: '#20A025',
    borderWidth: 1,
    flex: 1
  },
  submitButton: {
    color: 'black',
    opacity: 0.6,
    padding: 11,
    fontSize: 20
  }
});

module.exports = TodoInput;