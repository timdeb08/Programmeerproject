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
                    return d.properties.Gemeentenaam + "<br>" + "FvD: " + data[d.properties.Gemeentenaam]["ForumvoorDemocratie"]
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
            pieChart(d.properties.Gemeentenaam, data)
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
  var color = d3.scaleOrdinal();
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

  // Get the keys and values of JSON file
  valuesGemeente = Object.values(data[gemeente])
  gemeenteNaam = Object.keys(data)
  valuesAlleGemeente= Object.values(data)
  console.log(values)
  console.log(keys1)
  console.log(values1)

  // Create dataset with all municipalities per province
  var data_set = {};
  for (i = 0; i < gemeenteNaam.length; i++) {
    if (valuesGemeente[0] == valuesAlleGemeente[i]["OuderRegioNaam"]) {
      data_set[gemeenteNaam[i]] = valuesAlleGemeente[i]
    }
  }

  // Make dict loopable for d3 functions
  data_set2 = d3.entries(data_set)

  // Set margin, width, height
  var margin = {top: 10, right: 30, bottom: 30, left: 60},
      width = 560 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  // Append svg object to the body of the page
  var svg = d3.select("#scatterplot")
              .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Add the x axis
  var x = d3.scaleLinear()
            .domain([0, d3.max(data_set2, function(d) { return d.value.ForumvoorDemocratie; })])
            .range([0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add the y axis
  var y = d3.scaleLinear()
            .domain([0, d3.max(data_set2, function(d) { return d.value.Opkomst; })])
            .range([height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add a tooltip
  var tooltip = d3.tip()
                .attr("class", "d3-tip")
                .html(function(d) {
                  key = d.key
                  value1 = d.value.Opkomst
                  value2 = d.value.ForumvoorDemocratie
                  return "Gemeente: " + key + "<br>" + "Opkomst: " + value1 + "<br>" + "Aantal stemmen: " + value2;
                });
  svg.call(tooltip);

  // Add dots
  svg.append("g")
    .selectAll("dot")
    .data(data_set2)
    .enter()
    .append("circle")
      .attr("cx", function(d) { return x(d.value.ForumvoorDemocratie); })
      .attr("cy", function(d) { return y(d.value.Opkomst); })
      .attr("r", 8)
      .style("fill", "#69b3a2")
      .style("opacity", 0.3)
      .style("stroke", "white")

  // Initiate tooltip
  svg.selectAll("circle")
      .on("mouseover", tooltip.show)
      .on("mouseout", tooltip.hide);
}
