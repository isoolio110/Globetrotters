// instantiate the collections
var otherUsers = new OtherUsersList();
var stories = new StoryList();
var topDestinations = new MostPopularDestinationList();
var users = new UsersList();
var userLocations = new UserLocationList();

// fetch to populate the collections
otherUsers.fetch();
stories.fetch();
topDestinations.fetch();
users.fetch();
userLocations.fetch();

// instantiate the router and pass it the collections 
var router = new AppRouter({
    usersLocationCollection: userLocations,
    usersStoriesCollection: stories,
    topDestinationsCollection: topDestinations,
    otherUsersCollection: otherUsers,
    usersCollection: users
});


window.onload=function(){
  $('#landing-pg-imgs').cycle({
    fx: 'fade',
    timeout: 2500, 
    speed: 2500
  });

  $('#map-canvas').hide();
  $('#bar-chart').hide();
  $('#user-locations-container').hide();        

  Backbone.history.start()

  $.fn.serializeObject = function()
  {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
      if (o[this.name]) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
             }
          o[this.name].push(this.value || '');
         } else {
          o[this.name] = this.value || '';
         }
     });
     return o;
  };

};
