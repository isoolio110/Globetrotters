var ProfileLinkView = Backbone.View.extend({
  className: 'profile-link',
  template: _.template($('#profile-link-template').html()),

  initialize: function(){
    this.render();      
  },

  render: function(){
    this.$el.html(this.template(this.model.toJSON));
    $('#profile-pg-profile-link-container').html(this.$el).show();
  }
});