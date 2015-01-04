console.log('loaded StoryListView.js - top')

var StoryListView = Backbone.View.extend({
  tagName: 'div',
  className: 'stories-list',
  template1: _.template($('#story-list-1-template').html()),
  template2: _.template($('#story-list-2-template').html()),

  initialize: function(options){
    this.template = this['template' + options.template_number];
    this.collection = options.collection;
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function(){
    var renderedHTML = this.template({
      stories: this.collection});
    this.$el.html(renderedHTML);
    return this;
  },

  events: {
    'submit form': 'onSubmit'
  },

  onSubmit: function(e){
    e.preventDefault();
      var title = this.$('[name="Title"]').val();
    var location = this.$('[name="Location"]').val();
    var description = this.$('[name="Description"]').val();
    var packlist = this.$('[name="PackList"]').val();
    this.collection.create({title: title, location: location, description: description, packlist: packlist
    });
  }

});

console.log('loaded StoryListView.js - bottom')
