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
    Text,
    View
    } = React;

var MOCKED_MOVIES_DATA = [
  {title: 'Title', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}}
];
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

var App = React.createClass({
  getInitialState: function () {
    return {movies: null};
  },
  fetchData: function () {
    fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData)=> {
          this.setState({
            movies: responseData.movies
          });
        }).done();
    this.setState({movies: []});
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
    var thisMovies = this.state.movies;
    if (!(thisMovies && thisMovies.length > 0)) {
      return this.renderLoadingView();
    }

    var movie = thisMovies[0];
    return this.renderMovie(movie);
  }
});

var styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'row'
  }, thumbnail: {
    width: 53,
    height: 81
  }, rightContainer: {
    flex: 50,
    alignItems: 'center'
  }
};

AppRegistry.registerComponent('reactNativeTodo', () => App);