var OtherUsersList = Backbone.Collection.extend({
  url: '/other_users',
  model: OtherUser,

  customFilter: function(filter) {
    var results = this.where(filter);
    return new OtherUsersList(results);
  }

});
