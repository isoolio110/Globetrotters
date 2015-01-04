console.log('loaded AppRouter.js - top')

var AppRouter = Backbone.Router.extend({
  routes: {
      'userlocations/:id': 'userLocation' 
    },

  initialize: function(options) {
    this.usersCollection = options.usersCollection;
    this.usersLocationCollection = options.usersLocationCollection;
    this.topDestinationsCollection = options.topDestinationsCollection;
  },

  // userlocations page
  setLocationsListView: function(newView) {
    if (this.view) {
      this.view.remove();
    }
    this.view = newView;
    $('#user-locations-container').html(this.view.render().$el);
  },

  userLocationsList: function(id) {
    var userSpecificLocations = this.usersLocationCollection.customFilter({"user_id": parseInt(id)});
    var view = new UserLocationListView({collection: userSpecificLocations}); 
    this.setLocationsListView(view);
  }

});

console.log('loaded AppRouter.js - bottom')
