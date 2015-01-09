var OtherUsersListView = Backbone.View.extend({
  tagName: 'div',
  className: 'other-users-list',
  template: _.template($('#other-users-list-template').html()),

  initialize: function(){
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function(){
    var renderedHTML = this.template({
      otherUsers: this.collection});
    this.$el.html(renderedHTML);
    return this;
  }
  
});