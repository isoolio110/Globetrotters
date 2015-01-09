var UsersListView = Backbone.View.extend({
  tagName: 'div',
  className: 'profile-pic',
  template: _.template($('#users-list-template').html()),

  initialize: function(){
    this.listenTo(this.collection, 'change', this.render);
    this.render();
  },

  render: function(){
    this.$el.html(this.template({ 
      users: this.collection 
    }));
    $('#profile-pg-profile-pic-container').html(this.$el).show();
  }
  
});