var StoryDetailView = Backbone.View.extend({

  className: 'story-detail',

  template: _.template($('#story-detail-template').html()),

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    $('#story-detail-container').html(this.$el);
  },

  done: function() {
  var userId = this.model.get('user_id')
    window.location.href = '#profiles/'+userId;
  },

  events: {
    'click .back-to-profile-btn': 'onDone',
    'click .delete-btn': 'onDelete',
    'click .save-btn': 'onSave'
  },

  onDone: function(evt) {
    evt.preventDefault();
    this.done();
    return this;
  },

  onSave: function(evt) {
    evt.preventDefault();
    var data = this.$('input').serializeObject();
    this.model.save(data);
    this.done();
    return this;
  },

  onDelete: function(evt) {
    evt.preventDefault();
    if (window.confirm('Are you sure you want to delete this story?')) {
      this.model.destroy();
      this.done();
    }
    return this;
  }

});
