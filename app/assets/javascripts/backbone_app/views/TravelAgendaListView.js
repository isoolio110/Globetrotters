var TravelAgendaListView = Backbone.View.extend({

  className: 'travel-agenda-list',

  template1: _.template($('#travel-agenda-list-1-template').html()),

  template2: _.template($('#travel-agenda-list-2-template').html()),

  initialize: function(options){
    this.collection = options.collection;
    this.user_id = options.user_id;
    this.template = this['template' + options.template_number];
    this.listenTo(this.collection, 'sync', this.render);
    this.render();
  },

  render: function(){
    var renderedHTML = this.template({
      locations: this.collection,
      user_id: this.user_id
    });
    this.$el.html(renderedHTML);
    $('#profile-pg-travel-agenda-container').html(this.$el);
  }

});
