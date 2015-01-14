var UsersList = Backbone.Collection.extend({
  url: '/users',
  model: User
});