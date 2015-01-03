console.log("loaded UsersList.js - top");

var UsersList = Backbone.Collection.extend({
  url: '/users',
  model: User

});

console.log("loaded UsersList.js - bottom");
