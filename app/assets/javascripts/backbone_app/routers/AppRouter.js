console.log('loaded AppRouter.js - top')

var AppRouter = Backbone.Router.extend({
  routes: {
      'userlocations/:id': 'userLocation',
      'profiles/:id' : 'profile'
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

  // profile link view
  setProfileLinkView: function(newView) {
    this.view = newView;
    $('#profile-pg-profile-link-container').html(this.view.render().$el);
  },

  profileLink: function() {
    console.log('loaded AppRouter: profileLink')  
    var currentUser  = this.usersCollection.findWhere({current_user: 1});
    var currentUserID = currentUser.attributes.id;
    var currentUserUsername = currentUser.attributes.username;
    var currentUserImageURL = currentUser.attributes.image_url;
    var profileLinkView = new ProfileLinkView({currentUserID: currentUserID,currentUserUsername: currentUserUsername, currentUserImageURL: currentUserImageURL});
    this.setProfileLinkView(profileLinkView);
  },  

  setStoriesView: function(newView) {
    this.view = newView;
    $('#profile-pg-stories-container').html(this.view.render().$el);
  },

  stories: function(id){
    console.log('loaded AppRouter: stories')
    var userSpecificStories = this.usersStoriesCollection.customFilter({"user_id": id});
    var currentUser  = this.usersCollection.findWhere({current_user: 1});
    var currentUserID = currentUser.attributes.id
    if (currentUserID == id) {
      templateNumber = 1    
    } else {
      templateNumber = 2
    }
    var storyView = new StoryListView({collection: userSpecificStories,template_number: templateNumber
    });
    this.setStoriesView(storyView);
  },

  setOtherUsersView: function(newView) {
    this.view = newView;
    $('#profile-pg-other-users-container').html(this.view.render().$el);
  },

  otherUsers: function(id){
    console.log('loaded AppRouter: otherUsers')
    var userSpecificOtherUsers = this.otherUsersCollection.customFilter({"user_id": id})      
    var otherUsersView = new OtherUsersListView({collection: userSpecificOtherUsers});
    this.setOtherUsersView(otherUsersView);   
  },

  setUsersView: function(newView) {
    this.view = newView;
    $('#profile-pg-profile-pic-container').html(this.view.render().$el);
  },

  users: function(id){
    console.log('loaded AppRouter: users')
    var user = this.usersCollection.customFilter({"id": id})
    var UsersView = new UsersListView({collection: user});
    this.setUsersView(UsersView);
  },

  profile: function(id){
    this.travelAgenda(parseInt(id));
    this.profileLink();
    this.stories(parseInt(id));    
    this.otherUsers(parseInt(id));
    this.users(parseInt(id));  
  },

  // story detail page
  setStoryView: function(newView) {
    if (this.view) {
      this.view.remove();
    }
    this.view = newView;
    this.view.render().$el.appendTo('#story-detail-container');
  },

  storyDetail: function(id) {
    console.log('loaded AppRouter: storyDetail')
    var story = this.usersStoriesCollection.get(parseInt(id))
    var storyDetailView = new StoryDetailView({model: story});
    this.setStoryView(storyDetailView);
  }

  // agenda detail page
  setAgendaDetailView: function(newView) {
    if (this.view) {
      this.view.remove();
    }
    this.view = newView;
    this.view.render().$el.appendTo('#agenda-detail-container');
  },

  agendaDetail: function(id) {
    console.log('loaded AppRouter: agendaDetail')
    var location = this.usersLocationCollection.get(parseInt(id))
    var agendaDetailView = new AgendaDetailView({model: location});
    this.setAgendaDetailView(agendaDetailView);
  }


});

console.log('loaded AppRouter.js - bottom')
