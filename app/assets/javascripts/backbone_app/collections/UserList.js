console.log("loaded UsersList.js - top");

var UsersList = Backbone.Collection.extend({
  url: '/users',
  model: User

  customFilter: function(filter) {
  var results = this.where(filter);
  return new UsersList(results);
  }

});

console.log("loaded UsersList.js - bottom");
