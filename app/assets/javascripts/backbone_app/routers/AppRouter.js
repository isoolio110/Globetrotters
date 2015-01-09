var AppRouter = Backbone.Router.extend({

  initialize: function() {
    this.otherUsersCollection = new OtherUsersList();
    this.usersStoriesCollection = new StoryList();
    this.topDestinationsCollection = new MostPopularDestinationList();
    this.usersCollection = new UsersList();
    this.locationCollection = new LocationList();

    this.otherUsersCollection.fetch();
    this.usersStoriesCollection.fetch();
    this.usersCollection.fetch();
  },

  routes: {
      'locations/:user_id': 'location',
      'profiles/:id' : 'profile',
      'story/:id' : 'storyDetail',
      'agenda/:id' : 'agendaDetail'
    },

  ////////////////////
  // Location Stuff //
  ////////////////////

  location: function(user_id){
    createAndRenderLocationList(parseInt(user_id), this.locationCollection);
    createAndRenderBarChart(this.topDestinationsCollection);

    function createAndRenderLocationList(id, locationCollection) {
      locationCollection.url = "/users/" + id + "/locations";
      locationCollection.fetch({
        success: function(data) {
          var newLocationListView = new LocationListView({collection: data});
        }
      });
    }

    function createAndRenderBarChart(topDestinationsCollection) {
      topDestinationsCollection.fetch({
        success: function(data) {
          var newView = new MostPopularDestinationView({ collection: data });
        }
      });
    }
  },

  ////////////////////////
  // Profile Page Stuff //
  ////////////////////////

  profile: function(id){
    var userId = parseInt(id);
    this.travelAgenda(userId);
    this.profileLink();
    this.stories(userId);
    this.otherUsers(userId);
    this.users(userId);
  },

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
    var userSpecificLocations = this.locationCollection.customFilter({"user_id": id});
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

  ///////////////////////
  // Story Detail Page //
  ///////////////////////

  storyDetail: function(id) {
    console.log('loaded AppRouter: storyDetail')
    var story = this.usersStoriesCollection.get(parseInt(id))
    var storyDetailView = new StoryDetailView({model: story});
    this.setStoryView(storyDetailView);
  },

  setStoryView: function(newView) {
    if (this.view) {
      this.view.remove();
    }
    this.view = newView;
    this.view.render().$el.appendTo('#story-detail-container');
  },

  ////////////////////////
  // Agenda Detail Page //
  ////////////////////////

  agendaDetail: function(id) {
    console.log('loaded AppRouter: agendaDetail')
    var location = this.locationCollection.get(parseInt(id))
    var agendaDetailView = new AgendaDetailView({model: location});
    this.setAgendaDetailView(agendaDetailView);
  },

  setAgendaDetailView: function(newView) {
    if (this.view) {
      this.view.remove();
    }
    this.view = newView;
    this.view.render().$el.appendTo('#agenda-detail-container');
  }

});
