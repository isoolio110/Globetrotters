console.log("loaded MostPopularDestinationList.js - top");

var MostPopularDestinationList = Backbone.Collection.extend({
  url: '/mostpopulardestinations',
  model: MostPopularDestination
});

console.log("loaded MostPopularDestinationList.js - bottom");
