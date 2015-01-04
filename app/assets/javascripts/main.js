// instantiate the collections
var topDestinations = new MostPopularDestinationList();
var users = new UsersList();
var userLocations = new UserLocationList();

// fetch to populate the collections
topDestinations.fetch();
users.fetch();
userLocations.fetch();

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

};
