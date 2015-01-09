var LocationListView = Backbone.View.extend({
  className: 'userlocations-list',
  template: _.template($('#user-location-list-template').html()),

  // set up a listener
  initialize: function(){
    this.listenTo(this.collection, 'change', this.render);
    this.render();
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
    this.$el.html(this.template({ locations: this.collection }));
    $('#user-locations-container').html(this.$el).show();
  },

  events: {
    'submit form': 'onSubmit',
    'click #remove': 'onRemove'
  },

  // the onSubmit function states that when the event occurs:
  onSubmit: function(e){
    e.preventDefault();
    // get the value from the form where the name of the input tag is goal and assign it to the variable goal
    var new_location = this.$('[name="location"]').val();
      this.collection.create({place: new_location});
    },

  onRemove: function(e) {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this trip?')) {
      var model = this.collection.get(id);
      model.destroy();
    }
    return this;
  }

});
