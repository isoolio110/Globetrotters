var ProfilePictureView = Backbone.View.extend({

  className: 'profile-pic',
  template: _.template($('#profile-picture-template').html()),

  initialize: function(){
    this.listenTo(this.model, 'change', this.render);
    this.render();
  },

  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    $('#profile-pg-profile-pic-container').html(this.$el);
  }

});
