var UserLocationList = Backbone.Collection.extend({
  url: '/userlocations',
  model: UserLocation,

  customFilter: function(filter) {
    var results = this.where(filter);
    return new UserLocationList(results);
  }

});