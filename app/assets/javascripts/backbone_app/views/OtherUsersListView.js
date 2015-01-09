var OtherUsersListView = Backbone.View.extend({
  tagName: 'div',
  className: 'other-users-list',
  template: _.template($('#other-users-list-template').html()),

  initialize: function(){
    this.listenTo(this.collection, 'change', this.render);
    this.render();
  },

  render: function(){
    this.$el.html(this.template({ otherUsers: this.collection }));
    $('#profile-pg-other-users-container').html(this.$el).show();
  }
  
});