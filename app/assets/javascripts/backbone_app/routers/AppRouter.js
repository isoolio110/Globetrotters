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
        this.currentUser = this.getCurrentUser(data);
      }.bind(this)
    });
  },

  routes: {
      'locations/:user_id': 'location',                           // DONE
      'profiles/:user_id' : 'profile',                            // Working
      'story/:id' : 'storyDetail',
      'users/:user_id/locations/:location_id' : 'locationDetail'  //DONE
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

  ////////////////////////
  // Profile Page Stuff //
  ////////////////////////

  profile: function(user_id){
    user_id = parseInt(user_id)
    this.createAndRenderTravelAgendaList(user_id);
    this.createAndRenderProfileLink();
    this.createAndRenderUser(user_id);
    this.createAndRenderStoriesList(user_id);
    // this.createAndRenderOtherUsersList(user_id);
  },

  createAndRenderTravelAgendaList: function(user_id) {
    this.createAndRenderLocationList(parseInt(user_id))
    
    var templateNumber;

    if(!this.currentUser) {
      this.usersCollection.fetch({
        success: function(data) {
          this.currentUser = this.getCurrentUser(data);
          
        if (this.currentUser.attributes.id == user_id) {
          templateNumber = 1
        } else {
          templateNumber = 2
        }

        var agendaView = new TravelAgendaListView({
          collection: this.locationCollection,
          user_id: user_id,
          template_number: templateNumber
        });

        }.bind(this)
      });
    } else {

      if (this.currentUser.attributes.id == user_id) {
          templateNumber = 1
        } else {
          templateNumber = 2
        }

        var agendaView = new TravelAgendaListView({
          collection: this.locationCollection,
          user_id: user_id,
          template_number: templateNumber
        });

    }
    
  },

  createAndRenderProfileLink: function() {
    if(!this.currentUser) {
      this.usersCollection.fetch({
        success: function(data) {
          this.currentUser = this.getCurrentUser(data);
          var profileLinkView = new ProfileLinkView({model: this.currentUser});
        }.bind(this)
      });
    } 
    else {
      var profileLinkView = new ProfileLinkView({model: this.currentUser});
    }
  },

  createAndRenderUser: function(user_id){
    var userCollection = this.usersCollection;
    userCollection.url = "/users/" + user_id;
    userCollection.fetch({
      success: function(data){
        var newUserView = new UsersListView({
          collection: data});
      }.bind(this)
    })
  },

  createAndRenderStoriesList: function(user_id){
    var storyCollection = this.storyCollection;
    storyCollection.url = "/users/" + user_id + "/stories";
    storyCollection.fetch();
    console.log(storyCollection);
    var templateNumber;
    this.usersCollection.fetch({
      success: function(data) {
        this.currentUser = this.getCurrentUser(data);
      if (this.currentUser.attributes.id == user_id) {
        templateNumber = 1
      } else {
        templateNumber = 2
      }
      var newStoryListView = new StoryListView({
        collection: data, 
        template_number: templateNumber
      });
      }.bind(this)
    });
  },


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

    location.url = "/users/" + user_id + "/locations/" + location_id;

    location.fetch({
      success: function(){
        this.locationShowView = new LocationShowView({model: location});
      }
    });
  },

  //////////////////
  // SHARED STUFF //
  //////////////////

  createAndRenderLocationList: function(user_id) {
    var locationCollection = this.locationCollection;
    locationCollection.url = "/users/" + user_id + "/locations";
    locationCollection.fetch({
      success: function(data) {
        var newLocationListView = new LocationListView({collection: data});
      }.bind(this)
    });
  },

  getCurrentUser: function(userCollection) {
    return userCollection.findWhere({current_user: 1});
  }

});
