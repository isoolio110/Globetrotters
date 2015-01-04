console.log("loaded Story.js - top");

var Story = Backbone.Model.extend({
  defaults: {
    user_id: '',
    title: '',
    location: '', 
    description: '',
    packlist: ''
  }
});

console.log("loaded Story.js - bottom");
