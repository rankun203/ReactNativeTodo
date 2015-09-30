/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var React = require('react-native');
var {
    AppRegistry,
    Image,
    StyleSheet,
    ListView,
    Text,
    View
    } = React;

var MOCKED_MOVIES_DATA = [
  {title: 'Title', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}}
];
//var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';
var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var PAGE_SIZE = 25;
var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
var REQUEST_URL = API_URL + PARAMS;

var App = React.createClass({
  getInitialState: function () {
    return {
      loaded: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  },
  fetchData: function () {
    fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData)=> {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
            loaded: true
          });
        }).done();
  },
  componentDidMount: function () {
    this.fetchData();
  },
  renderLoadingView: function () {
    return (
        <View style={styles.container}>
          <Text>Loading movies...</Text>
        </View>
    );
  },
  renderMovie: function (movie) {
    console.log('rendering movie: ', movie);
    return (
        <View style={styles.container}>
          <Image
              source={{uri: movie.posters.thumbnail}}
              style={styles.thumbnail}
              />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.year}>{movie.year}</Text>
          </View>
        </View>
    );
  },
  render: function () {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
        <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderMovie}
            style={styles.listView}
            />
    );
  }
});

var styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'row',
    marginTop: 5
  }, thumbnail: {
    width: 53,
    height: 81
  }, rightContainer: {
    flex: 50,
    alignItems: 'center'
  }, listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF'
  }, title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center'
  }, year: {
    textAlign: 'center'
  }
};

AppRegistry.registerComponent('reactNativeTodo', () => App);
