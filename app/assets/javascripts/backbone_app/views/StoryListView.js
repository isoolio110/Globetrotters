var StoryListView = Backbone.View.extend({

  el: '#profile-pg-stories-container',

  template1: _.template($('#story-list-1-template').html()),

  template2: _.template($('#story-list-2-template').html()),

  initialize: function(options){
    this.template = this['template' + options.template_number];
    this.collection = options.collection;
    this.listenTo(this.collection, 'sync', this.render);
    this.render();
  },

  render: function(){
    this.$el.html(this.template({ stories: this.collection }));
  },

  events: {
    'click #submit-story-btn': 'createStory'
  },

  createStory: function(e){
    e.preventDefault();
    var title = this.$('[name="story-title"]').val();
    var location = this.$('[name="story-location"]').val();
    var description = this.$('[name="story-description"]').val();
    this.collection.create({
      title: title,
      location: location,
      description: description,
    }).bind(this);
  }

});
