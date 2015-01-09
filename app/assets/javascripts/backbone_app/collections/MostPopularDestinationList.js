var MostPopularDestinationList = Backbone.Collection.extend({
  url: '/mostpopulardestinations',
  model: MostPopularDestination
});