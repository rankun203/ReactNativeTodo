/**
 * Created on 10/1/15.
 * @author rankun203
 */

var React = require('react-native');
var CheckBox = require('react-native-checkbox');
var {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    AlertIOS
    } = React;

var TodoView = React.createClass({
  getInitialState: function () {
    var id = this.props.todo.id || this.props.todo._id;
    var rowId = this.props.rowId;
    var title = this.props.todo.title;
    var done = this.props.todo.done;
    return {
      todo: {
        id: id,
        rowId: rowId,
        title: title,
        done: done
      }
    };
  },
  render: function () {
    var title = this.state.todo.title;
    return (
        <TouchableHighlight
            onPress={this._onMarkDown}>
          <View style={styles.item}>
            <View style={styles.textWrap}>
              <Text style={this._todoStyle()}>{title}</Text>
            </View>
          </View>
        </TouchableHighlight>
    );
  }, onCheck: function (checked) {
    console.log(checked);
  }, _onMarkDown: function (e) {
    e.preventDefault();

    var todo = this.state.todo;
    if (todo.title.indexOf('Done') < 0) {
      todo.title = 'Done: ' + todo.title;
      todo.done = true;
    } else {
      todo.title = todo.title.replace(/^Done: /, '');
      todo.done = false;
    }

    this.setState(todo);
    this._updateTodo(todo, function (data) {
      console.log('Todo updated');
      //AlertIOS.alert('Todo updated.');
    });
  }, _todoStyle: function () {
    var opacity = this.state.todo.done ? 0.3 : 1;
    return {
      opacity: opacity
    };
  }, _updateTodo: function (todo, cb) {
    this.props.onUpdate(this.state.todo.rowId, todo, cb);
  }
});

var styles = StyleSheet.create({
  item: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#4CD964',
    borderBottomColor: '#48D155',
    borderBottomWidth: 1
  }, textWrap: {
    flex: 1,
    alignSelf: 'flex-start',
    padding: 5,
    justifyContent: 'center'
  }
});

module.exports = TodoView;