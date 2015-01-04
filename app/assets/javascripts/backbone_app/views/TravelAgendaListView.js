console.log('loaded TravelAgendaListView.js - top')

var TravelAgendaListView = Backbone.View.extend({
  tagName: 'div',
  className: 'travel-agenda-list',
  template1: _.template($('#travel-agenda-list-1-template').html()),
  template2: _.template($('#travel-agenda-list-2-template').html()),  

  initialize: function(options){
    this.collection = options.collection;
    this.user_id = options.user_id;
    this.template = this['template' + options.template_number];   
    this.listenTo(this.collection, 'sync', this.render);
  },
  
  render: function(){
    $("#landing-pg-main-div").hide(); 
    $('#map-canvas').hide();
    $('#bar-chart').hide();
    $('#user-locations-container').hide();
      $('#profile-pg-profile-link-container').show();   
    $('#profile-pg-profile-pic-container').show();
    $('#profile-pg-travel-agenda-container').show();
    $('#profile-pg-stories-container').show();
    $('#profile-pg-other-users-container').show();  
    var renderedHTML = this.template({
      userlocations: this.collection,
      user_id: this.user_id});
    this.$el.html(renderedHTML);
    return this;
  }

});

console.log('loaded TravelAgendaListView.js - bottom')
