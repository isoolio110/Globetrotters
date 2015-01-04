console.log("loaded OtherUsersList.js - top");

var OtherUsersList = Backbone.Collection.extend({
  url: '/otherusers',
  model: OtherUser
  
});

console.log("loaded OtherUsersList.js - bottom");
