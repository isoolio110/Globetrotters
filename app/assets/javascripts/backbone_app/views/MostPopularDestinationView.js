var MostPopularDestinationView = Backbone.View.extend({

  className: 'most-popular-view',

  template: _.template($('#most-popular-template').html()),

  initialize: function(){
    this.listenTo(this.collection, 'sync', this.render);
    this.render();
  },

  render: function(){
    this.$el.html(this.template({}));
    this.projectData(this.topdest(this.collection));
    $('#most-popular-destinations-chart-container').html(this.$el);
  },

  topdest: function(data) {
      var topdest = []
      for (i = 0; i < data.models.length; i++) {
      topdest.push(data.models[i].attributes);
          }
  return topdest;
  },

  projectData: function(data){
    var barchart = d3.select('#bar-chart')
      .selectAll('div')
      .data(data);
    var destination = barchart.enter()
      .append('div')
      .attr("class", "destination")
      .text(function(d){
        // round with 3 digits
        var formatNumber = d3.format(".3s");
        return d.destination + ": " + formatNumber(d.num_of_visitors) + " visitors" ;
      });
    barchart = d3.select('#bar-chart')
          .selectAll('div')
          .transition()
          .duration(3000)
          .style('width', function(d){
            if (d.num_of_visitors){
              return (parseInt(d.num_of_visitors)*0.000008)+'px';
            } else{
              return '0px';
            }
          });
  }
});
