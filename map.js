// Load the datasets
var requests = [d3.json("/scripts/gemeentegrenzen.json"), d3.json("/scripts/verkiezing.json")];
Promise.all(requests).then(function(res) {
  createMap(res[0], res[1])
}).catch(function(e) {
  throw(e);
});

function createMap(map, data){

  // keys = Object.keys(data)
  // values = Object.values(data)
  //
  // var winningParty = {};
  // var FvdVotes = {};
  // for (i = 0; i < keys.length; i++) {
  //   if (values[i]["ForumvoorDemocratie"]) {
  //     valueFvD = values[i]["ForumvoorDemocratie"]
  //     FvdVotes["Forum voor Democratie"] = valueFvD
  //   }
  // }
  // Set width and height
  var width = 700,
      height = 700;

  console.log(data)
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
  var svg = d3.select("#datamap")
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

  // Set width, height and radius
  var width = 1200,
      height = 800,
      radius = Math.min(width, height) / 2;

  // Legend dimensions
  var legendRectSize = 25,
      legendSpacing = 6;

  // Define color scale
  var color = d3.scaleOrdinal(d3.schemeCategory10);

  // Initiate svg element
  var svg = d3.select("#piechart")
              .append("svg")
                .attr("width", width)
                .attr("height", height)
              .append("g")
                .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");

  var arc = d3.arc()
              .innerRadius(radius * 0.4)
              .outerRadius(radius * 0.8);

  // Creates angles of the segments
  var pie = d3.pie()
              .value(function(d) { return d.value; });

  // Initiate tooltip
  var tooltip = d3.tip()
                .attr("class", "d3-tip")
                .html(function(d) {
                  key = d.data.key
                  value = d.data.value
                  return key + ": " + value;
                });
  svg.call(tooltip);

  // Creating the chart
  var path = svg.selectAll("path")
              .data(pie(d3.entries(data_set)))
              .enter()
              .append("path")

  path.transition()
      .duration(1000)
        .attr("fill", function(d) { return color(d.data.key); })
        .attr("d", arc)
        .each(function(d) { this._current = d; })
      .style("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 1);

  // Initiate tooltip
  path.on("mouseover", tooltip.show)
      .on("mouseout", tooltip.hide);

  // Define legend
  var legend = svg.selectAll(".legend")
                .data(color.domain())
                .enter()
                .append("g")
                  .attr("class", "legend")
                  .attr("transform", function(d, i) {
                    var height = legendRectSize + legendSpacing;
                    var offset = height * color.domain().length / 2;
                    var horz = 18 * legendRectSize;
                    var vert = i * height - offset;

                    return "translate(" + horz + "," + vert + ")";
                  });

  // Adding colored squares to legend
  legend.append("rect")
        .attr("width", legendRectSize)
        .attr("height", legendRectSize)
        .style("fill", color)
        .style("stroke", color);

  // Adding text to legend
  legend.append("text")
        .attr("x", legendRectSize + legendSpacing)
        .attr("y", legendRectSize - legendSpacing)
        .text(function(d) { return d; });

}

function scatterPlot(gemeente, data) {

  // Remove former scatterplot
  d3.select("#scatterplot").select("svg").remove();

  // Get the keys and values of JSON file
  valuesGemeente = Object.values(data[gemeente])
  gemeenteNaam = Object.keys(data)
  valuesAlleGemeente= Object.values(data)

  // Create dataset with all municipalities per province
  var data_set = {};
  for (i = 0; i < gemeenteNaam.length; i++) {
    if (valuesGemeente[0] == valuesAlleGemeente[i]["OuderRegioNaam"]) {
      data_set[gemeenteNaam[i]] = valuesAlleGemeente[i]
    }
  }

  // Make dict loopable for d3 functions
  datasetReady = d3.entries(data_set)

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
            .domain([0, d3.max(datasetReady, function(d) { return d.value.Opkomst; })])
            .range([0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add the y axis
  var y = d3.scaleLinear()
            .domain([0, d3.max(datasetReady, function(d) { return d.value.ForumvoorDemocratie; })])
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
    .data(datasetReady)
    .enter()
    .append("circle")
      .attr("cx", function(d) { return x(d.value.Opkomst); })
      .attr("cy", function(d) { return y(d.value.ForumvoorDemocratie); })
      .attr("r", 8)
      .style("fill", "#69b3a2")
      .style("opacity", 0.3)
      .style("stroke", "white")

  // Initiate tooltip
  svg.selectAll("circle")
      .on("mouseover", tooltip.show)
      .on("mouseout", tooltip.hide);

  var xValue = 'Opkomst'
  d3.selectAll(".xvalue")
    .on("click", function() {
      var xValue = this.getAttribute("value");
      svg.selectAll("circle")
          .data(datasetReady)
          .transition()
          .attr("cx", function(d) { console.log(d.value.xValue); })
          .attr("cy", function(d) { return y(d.value.ForumvoorDemocratie); })
          .transition()
          .duration(500);
    });
}
