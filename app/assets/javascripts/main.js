// instantiate the collections
var topDestinations = new MostPopularDestinationList();
var users = new UsersList();
var userLocations = new UserLocationList();

// fetch to populate the collections
topDestinations.fetch();
users.fetch();
userLocations.fetch();
