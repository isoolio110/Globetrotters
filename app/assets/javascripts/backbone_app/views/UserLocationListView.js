console.log('loaded UserLocationListView.js - top')

var UserLocationListView = Backbone.View.extend({
  // creates a div
  tagName: 'div',
  // the div will have a classname of below
  className: 'userlocations-list',
  // the underscore template id is from the script tag on the html
  template: _.template($('#user-location-list-template').html()),

  // set up a listener
  // the view is told which collection to listen to in the main.js file
  initialize: function(){
    this.listenTo(this.collection, 'sync', this.render);
  },

  // render means to populate the template with information from this collection
  render: function(){
    $("#landing-pg-main-div").hide(); 
    $('#profile-pg-profile-pic-container').hide();
    $('#profile-pg-travel-agenda-container').hide();
    $('#profile-pg-stories-container').hide();
    $('#profile-pg-other-users-container').hide();  
    $('#profile-pg-profile-link-container').hide();           
    $('#map-canvas').show();
    $('#bar-chart').show();
    $('#user-locations-container').show();     
    // the html data to be rendered is the data from the collection into the underscore template
    var renderedHTML = this.template({
      userlocations: this.collection});
    // put the data to be rendered into the list views html
    this.$el.html(renderedHTML);
    // show the html
    return this;
  },

  // backbone way of writing events
  events: {
    'submit form': 'onSubmit',
    'click #remove': 'onRemove'    
  },

  // the onSubmit function states that when the event occurs: 
  onSubmit: function(e){
    // prevent default action
    e.preventDefault();
    // get the value from the form where the name of the input tag is goal and assign it to the variable goal
    var location = this.$('[name="location"]').val();
    // var planned_date = this.$('[name="planned_date"]').val();
    this.collection.create({location: location
      // ,planned_date: planned_date
    });
    },

  onRemove: function(evt) {
    evt.preventDefault();
    if (window.confirm('Are you sure you want to delete this trip?')) {
    var model = this.collection.get(id);
    model.destroy();
    }
    return this;
  }

});

console.log('loaded UserLocationListView.js - bottom')
