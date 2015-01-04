console.log('loaded AppRouter.js - top')

var AppRouter = Backbone.Router.extend({
  routes: {
      'userlocations/:id': 'userLocation' 
    },

  initialize: function(options) {
    this.usersCollection = options.usersCollection;
    this.usersLocationCollection = options.usersLocationCollection;
    this.topDestinationsCollection = options.topDestinationsCollection;
    this.usersStoriesCollection = options.usersStoriesCollection;
    this.otherUsersCollection = options.otherUsersCollection;
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
  },

  setBarChartView: function(newView) {
    this.view = newView;
    $('#most-popular-destinations-chart-container').html(this.view.render().$el);
  },

  showBarChart: function() {
    var view = new MostPopularDestinationView({collection: this.topDestinationsCollection});
    this.setBarChartView(view);
  },

  userLocation: function(id){
    this.userLocationsList(parseInt(id));
    this.showBarChart();
  },

  // profile page

  // travel agenda view
  setTravelAgendaView: function(newView) {
    if (this.view) {
      this.view.remove();
    }
    this.view = newView;
    $('#profile-pg-travel-agenda-container').html(this.view.render().$el);
  },

  travelAgenda: function(id) { 
    console.log('loaded AppRouter: travelAgenda')
    var userSpecificLocations = this.usersLocationCollection.customFilter({"user_id": id});
    var currentUser  = this.usersCollection.findWhere({current_user: 1});
    var currentUserID = currentUser.attributes.id
    if (currentUserID == id) {
      templateNumber = 1    
    } else {
      templateNumber = 2
    }   
    var agendaView = new TravelAgendaListView({collection: userSpecificLocations, user_id: id, template_number: templateNumber});
    this.setTravelAgendaView(agendaView);
  },  

  profile: function(id){
    this.travelAgenda(parseInt(id));
  }

});

console.log('loaded AppRouter.js - bottom')
