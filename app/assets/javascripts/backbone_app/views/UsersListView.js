var UsersListView = Backbone.View.extend({
  tagName: 'div',
  className: 'profile-pic',
  template: _.template($('#users-list-template').html()),

  initialize: function(){
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function(){
    var renderedHTML = this.template({
      users: this.collection});
    this.$el.html(renderedHTML);
    return this;
  }
  
});