console.log("loaded StoryList.js - top");

var StoryList = Backbone.Collection.extend({
  url: '/stories',
  model: Story,

  customFilter: function(filter) {
    var results = this.where(filter);
    return new StoryList(results);
  }

});

console.log("loaded StoryList.js - bottom");
