// Load the datasets
var requests = [d3.json("/scripts/gemeentegrenzen.json"), d3.json("/scripts/verkiezing.json")];
Promise.all(requests).then(function(res) {
  createMap(res[0], res[1])
}).catch(function(e) {
  throw(e);
});

function createMap(map, data){

  // Set width and height
  var width = 700,
      height = 700;

  // Define map projection
  var projection = d3.geoMercator()
                    .scale(8200)
                    .center([0, 52])
                    .rotate([-4.8, 0])
                    .translate([width / 2, height / 2]);

  // Prepare a path object and apply the projection to it
  var path = d3.geoPath()
              .projection(projection);

  // Initiate svg element
  var svg = d3.select("#container")
              .append("svg")
                .attr("width", width)
                .attr("height", height);

  var tooltip = d3.tip()
                  .attr("class", "d3-tip")
                  .offset([-8, 0])
                  .html(function(d) {
                    return d.properties.Gemeentenaam + "<br>" + "FvD: " + data[d.properties.Gemeentenaam]["Forum voor Democratie"]
                  });

  svg.call(tooltip);

  // Make map interactive
  svg.selectAll("path")
      .data(map.features)
      .enter()
      .append("path")
        .attr("d", path)
        .attr("stroke", "rgba(8, 81, 156, 0.2)")
        .attr("fill", "rgba(8, 81, 156, 0.2)")
          .on("mouseover", tooltip.show)
          .on("mouseout", tooltip.hide)
          .on("click", function(d) {
            // pieChart(d.properties.Gemeentenaam, data)
            scatterPlot(d.properties.Gemeentenaam, data)
          });

};

function pieChart(gemeente, data) {

  // Remove former piechart if existing
  d3.select("#piechart").select("svg").remove();

  // Get keys and values from dataset
  keys = Object.keys(data[gemeente])
  values = [];
  for (i in keys) {
    values.push(data[gemeente][keys[i]]);
  }

  // Only get data needed for the pie chart
  keys1 = keys.slice(2, 39)
  values1 = values.slice(2, 39)

  // Put data in dict
  var data_set = {};
  for (i = 0; i < keys1.length; i++) {
    data_set[keys1[i]] = values1[i]
  }

  // Remove parties with zero votes
  Object.keys(data_set).forEach(function(key) {
    if (data_set[key] == 0) {
      delete data_set[key];
    }
  })

  // Set margin, width, height and radius
  var margin = 40;
  var width = 450;
  var height = 450;
  var radius = Math.min(width, height) / 2 - margin

  // Append svg object to div
  var svg = d3.select("#piechart")
              .append("svg")
                .attr("width", width)
                .attr("height", height)
              .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  // Compute the position of each group on the pie
  var pie = d3.pie()
              .value(function(d) { return d.value; })
  var data_ready = pie(d3.entries(data_set))

  // Shape helper to build arcs
  var arc = d3.arc()
              .innerRadius(radius * 0.4)
              .outerRadius(radius * 0.8);

  // Set the color scale
  var color = d3.scaleOrdinal()
              .domain(values.length)
              .range(d3.schemeSet2);

  // Initiate tooltip
  var tooltip = d3.tip()
                .attr("class", "d3-tip")
                .html(function(d) {
                  key = d.data.key
                  value = d.data.value
                  return key + ": " + value;
                });
  svg.call(tooltip);

  // Create the pie chart
  svg.selectAll("mySlices")
      .data(data_ready)
      .enter()
      .append("path")
        .attr("d", d3.arc()
                    .innerRadius(100)
                    .outerRadius(radius)
          )
        .attr("fill", function(d) { return(color(d.data.value)) })
        .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 1);

  // Text on the slices
  svg.selectAll("mySlices")
      .data(data_ready)
      .enter()
      .append("text")
      .text(function(d) { return d.data.key })
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .style("text-anchor", "middle")
      .style("font-size", 10)

  // Initiate tooltip
  svg.selectAll("path")
      .on("mouseover", tooltip.show)
      .on("mouseout", tooltip.hide);

  // Text in the middle of pie chart
  svg.append('text')
      .attr('class', 'text')
      .attr('dy', -15)
      .html('Political diversion')
      .style('font-size', '.9em')
      .style('text-anchor', 'middle');


  // CREATE LEGEND FOR THE POLITICAL PARTIES
  // NAMES ARE TOO LONG FOR IN THE PIE CHART

  // var polyline = svg.select('.lines')
  //             .selectAll('polyline')
  //             .data(pie(d3.entries(data_set)))
  //           .enter().append('polyline')
  //             .attr('points', function(d) {
  //               // see label transform function for explanations of these three lines.
  //               var pos = outerArc.centroid(d);
  //               pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
  //               return [arc.centroid(d), outerArc.centroid(d), pos]
  //             });
  //
  // var label = svg.select('.labels').selectAll('text')
  //                 .data(pie(d3.entries(data_set)))
  //               .enter().append('text')
  //                 .attr('dy', '.35em')
  //                 .html(function(d) {
  //                     return d.data.key + d.data.value;
  //
  //                 })
  //                 .attr('transform', function(d) {
  //                     var pos = outerArc.centroid(d);
  //                     pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
  //                     return 'translate(' + pos + ')';
  //                 })
  //                 .style('text-anchor', function(d) {
  //                     return (midAngle(d)) < Math.PI ? 'start' : 'end';
  //                 });
  //

  //
  // function midAngle(d) { return d.startAngle + (d.endAngle - d.startAngle) / 2; }

}

function scatterPlot(gemeente, data) {

  // Remove former scatterplot
  d3.select("#scatterplot").select("svg").remove();

  // Get keys and values from dataset
  keys = Object.keys(data[gemeente])
  values = [];
  for (i in keys) {
    values.push(data[gemeente][keys[i]]);
  }

  // Put data in dict
  var data_set = {};
  for (i = 0; i < keys.length; i++) {
    data_set[keys[i]] = values[i]
  }
  // console.log(data_set);

  // Get the necessary data
  Object.keys(data_set).forEach(function(key) {
    if (key !== "Forum voor Democratie" && key !== "Opkomst") {
      delete data_set[key];
    }
  })

  console.log(data_set)



}
