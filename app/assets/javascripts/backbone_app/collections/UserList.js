var UsersList = Backbone.Collection.extend({
  url: '/users',
  model: User,

  customFilter: function(filter) {
  var results = this.where(filter);
  return new UsersList(results);
  }

});