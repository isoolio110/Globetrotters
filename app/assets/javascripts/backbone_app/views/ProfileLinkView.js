var ProfileLinkView = Backbone.View.extend({
  tagName: 'div',
  className: 'profile-link',
  template: _.template($('#profile-link-template').html()),

  initialize: function(options){
      this.currentUserID = options.currentUserID 
      this.currentUserUsername = options.currentUserUsername 
      this.currentUserImageURL = options.currentUserImageURL
  },

  render: function(){
    var renderedHTML = this.template({
      currentUserID: this.currentUserID, currentUserUsername: this.currentUserUsername, currentUserImageURL: this.currentUserImageURL
    });
    this.$el.html(renderedHTML);
    return this;
  }

});