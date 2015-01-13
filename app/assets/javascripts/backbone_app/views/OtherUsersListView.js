var OtherUsersListView = Backbone.View.extend({
  
  el: '#profile-pg-other-users-container',
  
  template: _.template($('#other-users-list-template').html()),

  initialize: function(){
    this.listenTo(this.collection, 'change', this.render);
    this.render();
  },

  render: function(){
    this.$el.html(this.template({ otherUsers: this.collection }));
  }
  
});