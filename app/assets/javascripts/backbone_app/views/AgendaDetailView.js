var AgendaDetailView = Backbone.View.extend({
  tagName: 'div',
  className: 'agenda-detail',
  template: _.template($('#agenda-detail-template').html()),

  render: function() {
  $("#landing-pg-main-div").hide(); 
  $('#map-canvas').hide();   
  $('#profile-pg-profile-link-container').hide();   
  $('#profile-pg-profile-pic-container').hide();
  $('#profile-pg-travel-agenda-container').hide();
  $('#profile-pg-stories-container').hide();
  $('#profile-pg-other-users-container').hide();
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  events: {
    'click #done': 'onDone',
    'click #remove': 'onRemove',
    'click #save': 'onSave'
  },

  done: function() {
  var userId = this.model.get('user_id')
    window.location.href = '#profiles/'+userId;
  },

  onDone: function(evt) {
    evt.preventDefault();
    this.done();
    return this;
  },

  onSave: function(evt) {
    evt.preventDefault();
    console.log(this.$('input'))
    var data = this.$('input').serializeObject();
    this.model.save(data);
    this.done();
    return this;
  },

  onRemove: function(evt) {
    evt.preventDefault();
    if (window.confirm('Are you sure you want to delete this trip?')) {
      this.model.destroy();
      this.done();
    }
    return this;
  }

});