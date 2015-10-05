/**
 * Created on 10/5/15.
 * @author rankun203
 */

var React = require('react-native');
var Button = require('react-native-button');
var API = require('../network/API');
var {
    View,
    Text,
    PixelRatio,
    TextInput,
    TouchableHighlight,
    StyleSheet
    } = React;

var SettingsPage = React.createClass({
  getInitialState: function () {
    return {
      api: API.SERVER_PREFIX
    };
  },
  render: function () {
    return (
        <View style={styles.container}>
          <View style={styles.apiBox}>
            <Text>Current API: {this.state.api}</Text>
          </View>
          <View style={styles.settingItem}>
            <TextInput
                style={styles.textInput}
                value={this.state.api}
                onChangeText={this._handleChange}
                onSubmitEditing={this._handleSubmitPress}
                />
            <Button
                onPress={this._handleSubmitPress}
                style={styles.button}>Set</Button>
          </View>
        </View>
    );
  },
  _handleChange: function (v) {
    this.setState({api: v});
  },
  _handleSubmitPress: function () {
    API.updateServerPrefix(this.state.api);
    console.log('API.SERVER_PREFIX=' + API.SERVER_PREFIX);
  }
});

var styles = StyleSheet.create({
  container: {
    marginTop: 64
  },
  apiBox: {
    alignItems: 'center',
    padding: 10
  },
  settingItem: {
    flexDirection: 'row',
    padding: 10
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#cccccc'
  },
  button: {
    padding: 5
  },
  customWrapperStyle: {
    backgroundColor: '#bbdddd'
  },
  list: {
    backgroundColor: '#eeeeee',
    marginTop: 10
  },
  group: {
    backgroundColor: 'white'
  },
  groupSpace: {
    height: 15
  },
  line: {
    backgroundColor: '#bbbbbb',
    height: 1 / PixelRatio.get()
  },
  row: {
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15
  },
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#bbbbbb',
    marginLeft: 15
  },
  rowNote: {
    fontSize: 17
  },
  rowText: {
    fontSize: 17,
    fontWeight: '500'
  }
});

module.exports = SettingsPage;