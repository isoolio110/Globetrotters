var ProfilePictureView = Backbone.View.extend({

  el: '#profile-pg-profile-pic-container',
  template: _.template($('#profile-picture-template').html()),

  initialize: function(){
    this.listenTo(this.model, 'change', this.render);
    this.render();
  },

  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
  }

});
