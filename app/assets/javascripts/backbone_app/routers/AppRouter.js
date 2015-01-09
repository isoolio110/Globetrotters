var AppRouter = Backbone.Router.extend({

  initialize: function() {
    this.otherUsersCollection = new OtherUsersList();
    this.storyCollection = new StoryList();
    this.topDestinationsCollection = new MostPopularDestinationList();
    this.usersCollection = new UsersList();
    this.locationCollection = new LocationList();
    
    this.otherUsersCollection.fetch();
    // this.usersStoriesCollection.fetch();
    this.usersCollection.fetch({
      success: function(data) {
        this.currentUserID = this.getCurrentUserId(data);
      }.bind(this)
    });
  },

  routes: {
      'locations/:user_id': 'location',
      'profiles/:user_id' : 'profile',
      'story/:id' : 'storyDetail',
      'users/:user_id/locations/:location_id' : 'locationDetail'
    },

  ////////////////////
  // Location Stuff //
  ////////////////////

  location: function(user_id){
    this.createAndRenderLocationList(parseInt(user_id));
    createAndRenderBarChart(this.topDestinationsCollection);

    function createAndRenderBarChart(topDestinationsCollection) {
      topDestinationsCollection.fetch({
        success: function(data) {
          var newView = new MostPopularDestinationView({ collection: data });
        }
      });
    }
  },

  createAndRenderLocationList: function(id) {
    var locationCollection = this.locationCollection;
    locationCollection.url = "/users/" + id + "/locations";
    locationCollection.fetch({
      success: function(data) {
        var newLocationListView = new LocationListView({collection: data});
      }.bind(this)
    });
  },

  ////////////////////////
  // Profile Page Stuff //
  ////////////////////////

  profile: function(user_id){
    this.createAndRenderTravelAgendaList(parseInt(user_id));
    // this.createAndRenderProfileLink();
    // this.createAndRenderStoriesList(userId);
    // this.createAndRenderOtherUsersList(userId);
    // this.createAndRenderUserList(userId);
  },

  createAndRenderTravelAgendaList: function(user_id) {
    this.createAndRenderLocationList(parseInt(user_id))
    
    if (this.currentUserID == user_id) {
      templateNumber = 1
    } else {
      templateNumber = 2
    }
    
    var agendaView = new TravelAgendaListView({
      collection: this.locationCollection,
      user_id: user_id,
      template_number: templateNumber
    });
    
    this.setTravelAgendaView(agendaView);
  },

  // travel agenda view
  setTravelAgendaView: function(newView) {
    if (this.view) {
      this.view.remove();
    }
    this.view = newView;
    $('#profile-pg-travel-agenda-container').html(this.view.render().$el);
  },


  // createAndRenderProfileLink: function() {
  //   where should the fetch be happening?
  //   var currentUser  = this.usersCollection.findWhere({current_user: 1});
  //   var currentUserID = currentUser.attributes.id;
  //   var currentUserUsername = currentUser.attributes.username;
  //   var currentUserImageURL = currentUser.attributes.image_url;
  //   var profileLinkView = new ProfileLinkView({currentUserID: currentUserID,currentUserUsername: currentUserUsername, currentUserImageURL: currentUserImageURL});
  // },

  // createAndRenderStoriesList: function(user_id){
  //   var currentUser  = this.usersCollection.findWhere({current_user: 1});
  //   var currentUserID = currentUser.attributes.id
  //   if (currentUserID == user_id) {
  //     templateNumber = 1
  //   } else {
  //     templateNumber = 2
  //   };
  //   that = this;
  //   var storyCollection = this.storyCollection
  //   storyCollection.url = "/users/" + user_id + "/stories"
  //   // how do i pass in the template number??
  //   storyCollection.fetch({
  //     success: function(data) {
  //       var newStoryListView = new StoryListView({collection: data, template_number: 1}); 
  //     }.bind(this)
  //   });
  // },

  // createAndRenderOtherUsersList: function(user_id){
  //   var otherUserCollection = this.otherUserCollection;
  //   otherUserCollection.url = "/users/" + user_id + "/otherusers"
  //   otherUserCollection.fetch({
  //     success: function(data){
  //       var newOtherUserListView = new OtherUsersListView({
  //         collection: data})
  //     }.bind(this)
  //   });
  // },

  // createAndRenderUserList: function(user_id){
  //   var userCollection = this.usersCollection;
  //   userCollection.url = "/users/" + user_id;
  //   userCollection.fetch({
  //     success: function(data){
  //       var newUserView = new UsersListView({
  //         collection: data});
  //     }.bind(this)
  //   })
  // },


  ///////////////////////
  // Story Detail Page //
  ///////////////////////

  storyDetail: function(id) {
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

  locationDetail: function(user_id, location_id) {

    var location = new Location({
      user_id: user_id,
      id: location_id
    });
    
    location.fetch({
      success: function(){
        this.locationShowView = new LocationShowView({model: location});
      }
    });
  },

  /////////////////
  // MISC. STUFF //
  /////////////////

  getCurrentUserId: function(userCollection) {
    var currentUser  = userCollection.findWhere({current_user: 1});
    return currentUser.attributes.id
  }

});
