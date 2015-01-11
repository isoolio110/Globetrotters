var LocationShowView = Backbone.View.extend({

  className: 'agenda-detail',

  template: _.template($('#agenda-detail-template').html()),

  initialize: function() {
    this.render();
  },

  render: function() {
    $("#landing-pg-main-div").hide(); 
    $('#map-canvas').hide();   
    $('#profile-pg-profile-link-container').hide();   
    $('#profile-pg-profile-pic-container').hide();
    $('#profile-pg-travel-agenda-container').hide();
    $('#profile-pg-stories-container').hide();
    $('#profile-pg-other-users-container').hide();
    $('#agenda-detail-container').show();    
    this.$el.html(this.template(this.model.toJSON()));
    $('#agenda-detail-container').html(this.$el);
  },

  events: {
    'click #done': 'onDone',
    'click #remove': 'onRemove',
    'click #save': 'onSave'
  },

  done: function() {
    window.location.href = '#profiles/' + this.model.get('user_id');
  },

  onDone: function(e) {
    e.preventDefault();
    this.done();
  },

  onSave: function(e) {
    e.preventDefault();
    console.log(this.$('input'))
    var data = this.$('input').serializeObject();
    this.model.save(data);
    this.done();
  },

  onRemove: function(evt) {
    evt.preventDefault();
    if (window.confirm('Are you sure you want to delete this trip?')) {
      this.model.destroy();
      this.done();
    }
  }

});