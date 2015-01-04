console.log("loaded OtherUser.js - top");

var OtherUser = Backbone.Model.extend({
  defaults: {
    user_id: '',
    other_user_id: '',
    username: '',
    image_url: ''
  }
});

console.log("loaded OtherUser.js - bottom");
