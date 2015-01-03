console.log("loaded UserLocationList.js - top");

var UserLocationList = Backbone.Collection.extend({
  url: '/userlocations',
  model: UserLocation,

  customFilter: function(filter) {
    var results = this.where(filter);
    return new UserLocationList(results);
  }

});

console.log("loaded UserLocationList.js - bottom");
