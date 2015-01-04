console.log("loaded StoryList.js - top");

var StoryList = Backbone.Collection.extend({
  url: '/stories',
  model: Story

});

console.log("loaded StoryList.js - bottom");
