var Location = Backbone.Model.extend({
  
  defaults: {
    user_id: '',
    location: '',
    planned_date: '',
    visited_date:''
  },

  initialize: function(options) {
    this.url = "/users/" + options.user_id + "/locations/" + options.id 
  }
});