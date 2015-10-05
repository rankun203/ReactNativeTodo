/**
 * Created on 10/3/15.
 * @author rankun203
 */

var API = {
  SERVER_PREFIX: 'http://rankun.org:3000',
  SERVER_PREFIX: 'http://localhost:3000',
  updateServerPrefix: function (value) {
    this.SERVER_PREFIX = value;
  },

// Todos
  GET_TODOS: {method: 'get', api: '/todos'},
  POST_TODO: {method: 'post', api: '/todos'},
  UPDATE_TODO: {method: 'put', api: '/todos/:id'},
  DEL_TODO: {method: 'delete', api: '/todos/:id'}
};

module.exports = API;