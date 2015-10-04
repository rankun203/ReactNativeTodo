/**
 * Created on 10/4/15.
 * @author rankun203
 */

'use strict';

var React = require('react-native');
var {
    View,
    TextInput,
    StyleSheet
    } = React;

var TodoInput = React.createClass({
  render: function () {
    return (
        <View style={styles.inputBox}>
          <TextInput
              style={styles.textInput}
              />
        </View>
    );
  }
});

var styles = StyleSheet.create({
  inputBox: {},
  textInput: {
    height: 40,
    borderColor: 'red',
    borderWidth: 1
  }
});

module.exports = TodoInput;