console.log("loaded UserLocationList.js - top");

var UserLocationList = Backbone.Collection.extend({
  url: '/userlocations',
  model: UserLocation

});

console.log("loaded UserLocationList.js - bottom");
