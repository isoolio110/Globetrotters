var AppRouter = Backbone.Router.extend({

  initialize: function() {
    this.otherUserCollection = new OtherUsersList();
    this.storyCollection = new StoryList();
    this.topDestinationsCollection = new MostPopularDestinationList();
    this.usersCollection = new UsersList();
    this.locationCollection = new LocationList();
  },

  routes: {
      'locations/:user_id': 'location',
      'profiles/:user_id' : 'profile',
      'users/:user_id/locations/:location_id' : 'locationDetail',
      'users/:user_id/stories/:story_id' : 'storyDetail'
    },

  ////////////////////
  // Location Stuff //
  ////////////////////

  location: function(user_id){
    $(".page-container").hide();

    this.createAndRenderLocationList(parseInt(user_id));
    createAndRenderBarChart(this.topDestinationsCollection);

    function createAndRenderBarChart(topDestinationsCollection) {
      topDestinationsCollection.fetch({
        success: function(data) {
          this.mostPopoulationDestinationView = new MostPopularDestinationView({ collection: data });
          $("#locations-page").show();
        }
      });
    }
  },

  createAndRenderLocationList: function(user_id) {
    var locationCollection = this.locationCollection;
    locationCollection.url = "/users/" + user_id + "/locations";
    locationCollection.fetch({
      success: function(data) {
        this.newLocationListView = new LocationListView({collection: data});
      }.bind(this)
    });
  },

  ////////////////////////
  // Profile Page Stuff //
  ////////////////////////

  profile: function(user_id){
    $(".page-container").hide();
    this.renderAllProfilePageViews(parseInt(user_id));
  },

  renderAllProfilePageViews: function(user_id){
    this.createAndRenderProfileLink();
    this.createAndRenderUserAvatar(user_id);
    this.createAndRenderTravelAgendaList(user_id);
    this.createAndRenderStoriesList(user_id);
    this.createAndRenderOtherUsersList(user_id);
    $('#profile-page').show();
  },

  createAndRenderProfileLink: function() {
    this.usersCollection.fetch({
      success: function(data) {
        this.currentUser = this.getCurrentUser(data);
        this.profileLinkView = new ProfileLinkView({ model: this.currentUser });
      }.bind(this)
    });
  },

  createAndRenderUserAvatar: function(user_id){
    var userModel = new User();
    userModel.url = "/users/" + user_id;

    userModel.fetch({
      success: function(user){
        this.profilePictureView = new ProfilePictureView({ model: user });
      }.bind(this)
    });
  },

  createAndRenderTravelAgendaList: function(user_id) {

    this.usersCollection.fetch({
      success: function(data) {
        this.currentUser = this.getCurrentUser(data);

        var templateNumber;
        if (this.currentUser.attributes.id == user_id) {
          templateNumber = 1;
        } else {
          templateNumber = 2;
        }

        this.createAndRenderTravelAgendaListView(user_id, templateNumber);

      }.bind(this)
    });
  },

  createAndRenderTravelAgendaListView: function(user_id, templateNumber) {

    var locationCollection = this.locationCollection;
    locationCollection.url = "/users/" + user_id + "/locations";
    locationCollection.fetch({
      success: function(data) {
        this.agendaListView = new TravelAgendaListView({
          collection: this.locationCollection,
          user_id: user_id,
          template_number: templateNumber
        });
      }.bind(this)
    });

  },


  createAndRenderStoriesList: function(user_id){

    this.usersCollection.fetch({
      success: function(data) {
        this.currentUser = this.getCurrentUser(data);

        var templateNumber;
        if (this.currentUser.attributes.id == user_id) {
          templateNumber = 1;
        } else {
          templateNumber = 2;
        }

        var storyCollection = this.storyCollection;
        storyCollection.url = "/users/" + user_id + "/stories";
        storyCollection.fetch({
          success: function(data){
            this.storiesListView = new StoryListView({
              collection: data,
              template_number: templateNumber
            });
          }
        });
      }.bind(this)
    });
  },

  createAndRenderOtherUsersList: function(user_id){
    var otherUserCollection = this.otherUserCollection;
    otherUserCollection.url = "/users/" + user_id + "/other_users";
    otherUserCollection.fetch({
      success: function(data){
        this.otherUserListView = new OtherUsersListView({ collection: data });
      }.bind(this)
    });
  },

  ///////////////////////
  // Story Detail Page //
  ///////////////////////

  storyDetail: function(user_id, story_id){
    $(".page-container").hide();

    var story = new Story({
      user_id: user_id,
      id: story_id
      });

    story.url = "/users/" + user_id + "/stories/" + story_id;

    story.fetch({
      success: function(){
        var storyDetailView = new StoryDetailView({model: story});
        $('#story-detail-page').show();
      }
    });
  },

  ////////////////////////
  // Agenda Detail Page //
  ////////////////////////

  locationDetail: function(user_id, location_id) {
    $('.page-container').hide();

    var location = new Location({
      user_id: user_id,
      id: location_id
    });

    location.url = "/users/" + user_id + "/locations/" + location_id;

    location.fetch({
      success: function(){
        this.locationShowView = new LocationShowView({ model: location });
        $('#agenda-detail-page').show();
      }.bind(this)
    });
  },

  //////////////////
  // SHARED STUFF //
  //////////////////

  getCurrentUser: function(userCollection) {
    return userCollection.findWhere({current_user: 1});
  }

});
