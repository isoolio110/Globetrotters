var router;

$(function(){
  $('#landing-pg-imgs').cycle({
    fx: 'fade',
    timeout: 2500,
    speed: 2500
  });

  $('#map-canvas').hide();
  $('#bar-chart').hide();
  $('#user-locations-container').hide();

  $('html,body').scrollTop(0);

  MyAppRouter = new AppRouter();

  Backbone.history.start({pushState: false});

  $.fn.serializeObject = function()
  {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
      if (o[this.name]) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
             }
          o[this.name].push(this.value || '');
         } else {
          o[this.name] = this.value || '';
         }
     });
     return o;
  };

});
