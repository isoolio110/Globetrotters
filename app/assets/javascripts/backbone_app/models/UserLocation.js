console.log("loaded UserLocation.js - top");

var UserLocation = Backbone.Model.extend({
  defaults: {
    user_id: '',
    location: '',
    planned_date: '',
    visited_date:''
  }
});

console.log("loaded UserLocation.js - bottom");
