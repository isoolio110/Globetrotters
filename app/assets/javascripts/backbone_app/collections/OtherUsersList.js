var OtherUsersList = Backbone.Collection.extend({
  url: '/otherusers',
  model: OtherUser,

  customFilter: function(filter) {
  var results = this.where(filter);
  return new OtherUsersList(results);
  }

});