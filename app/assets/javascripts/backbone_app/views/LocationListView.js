var LocationListView = Backbone.View.extend({

  el: '#user-locations-container',

  template: _.template($('#user-location-list-template').html()),

  // set up a listener
  initialize: function(){
    this.listenTo(this.collection, 'change', this.render);
    this.render();
  },

  // render means to populate the template with information from this collection
  render: function(){
    this.$el.html(this.template({ locations: this.collection }));
    this.delegateEvents();
  },

  events: {
    'keypress #autocomplete': 'addLocation',
    'click #remove': 'onRemove'
  },

  toTitleCase: function(str){
    return str.replace(/\w*\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  },

  // the onSubmit function states that when the event occurs:
  addLocation: function(e){
    var code = e.keyCode;
    if (code == 13) {
      var new_location = this.$('[name="location"]').val();
      var new_location_capitalized = this.toTitleCase(new_location);
      this.collection.create({ 
        place: new_location_capitalized 
      }).bind(this);
    }
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
