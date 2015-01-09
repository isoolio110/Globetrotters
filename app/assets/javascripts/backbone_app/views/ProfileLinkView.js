var ProfileLinkView = Backbone.View.extend({
  tagName: 'div',
  className: 'profile-link',
  template: _.template($('#profile-link-template').html()),

  initialize: function(options){
      this.currentUserID = options.currentUserID; 
      this.currentUserUsername = options.currentUserUsername;
      this.currentUserImageURL = options.currentUserImageURL;
    this.render();      
  },

  render: function(){
    this.$el.html(this.template({ 
        currentUserID: this.currentUserID,
        currentUserUsername: this.currentUserUsername,
        currentUserImageURL: this.currentUserImageURL
    }));
    $('#profile-pg-profile-link-container').html(this.$el).show();
  }
});