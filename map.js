// Load the datasets
var requests = [d3.json("/scripts/gemeentegrenzen.json"), d3.json("/scripts/verkiezing.json")];
Promise.all(requests).then(function(res) {
  createMap(res[0], res[1])
}).catch(function(e) {
  throw(e);
});

function createMap(map, data){


  // var winningParty = {};
  // var FvdVotes = {};

  keys = Object.keys(data)
  values = Object.values(data)

  var winningParty = {};
  for (i in keys) {
    keys_gemeente = Object.keys(data[keys[i]])
    values_gemeente = Object.values(data[keys[i]])
    keys1_gemeente = keys_gemeente.slice(2, 40)
    values1_gemeente = values_gemeente.slice(2, 40)

    // Get dataset of keys and values needed
    var data_set = {};
    for (i = 0; i < keys1_gemeente.length; i++) {
      data_set[keys1_gemeente[i]] = values1_gemeente[i]
    }
    console.log(data_set)
    console.log(Object.values(data_set))
    var list = [];
    max = getMaxOfArray(Object.values(data_set))
    console.log(max)
    party = getKeyByValue(data_set, max)
    console.log(party)

    list.push(party, max)
    console.log(list)
    winningParty[keys[i]] = list
    console.log(winningParty)

  }

  function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
  }

  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }



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
  var svg = d3.select("#datamap")
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

  // Initiate dropdown with data sections needed
  var body = d3.select("#scatterplot")
  var selectData = [ { "text" : "Opkomst" },
                     { "text" : "Inkomen"},
                   ]
  // Remove former dropdown menu
  d3.selectAll(".textDrop").remove()
  d3.selectAll(".xSel").remove()

  // Select X-axis variable
  var span = body.append("span")
              .text("Select X-Axis variable: ")
              .attr("class","textDrop")

  var yInput = body.append("select")
                  .attr("id", "xSelect")
                  .attr("class", "xSel")
                  .on("change", xChange)
                .selectAll("option")
                .data(selectData)
                .enter()
                .append("option")
                  .attr("value", function(d) { return d.text; })
                  .text(function(d) { return d.text; })
  body.append("br")

  // Variables: width, height, margin
  var body = d3.select("#scatterplot")
  var margin = { top: 50, right: 50, bottom: 50, left: 50 }
  var height = 500 - margin.top - margin.bottom
  var width = 500 - margin.left - margin.right

  // Scales: x and y
  var xScale = d3.scaleLinear()
                  .domain([
                d3.min([0,d3.min(datasetReady,function (d) { return d.value["Opkomst"] })]),
                d3.max([0,d3.max(datasetReady,function (d) { return d.value["Opkomst"] })])
                ])
                .range([0,width])

  var yScale = d3.scaleLinear()
                  .domain([
                    d3.min([0,d3.min(datasetReady,function (d) { return d.value["Forum voor Democratie"] })]),
                    d3.max([0,d3.max(datasetReady,function (d) { return d.value["Forum voor Democratie"] })])
                    ])
                  .range([height,0])

  // Initiate SVG
  var svg = body.append("svg")
              .attr("height", height + margin.top + margin.bottom)
              .attr("width", width + margin.left + margin.right)
            .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  // X-axis
  var xAxis = d3.axisBottom(xScale)
              .ticks(7)

  // Y-axis
  var yAxis = d3.axisLeft(yScale)
              .ticks(7)

  // Add a tooltip
  var tooltip = d3.tip()
                .attr("class", "d3-tip")
                .html(function(d) {
                  key = d.key
                  inkomen = d.value["Inkomen"]
                  opkomst = d.value["Opkomst"]
                  forum = d.value["Forum voor Democratie"]
                  return "Gemeente: " + key + "<br>" + "Inkomen: " + inkomen + "<br>" + "Opkomst: " + opkomst + "<br>" + "Aantal stemmen FvD: " + forum;
                });
  svg.call(tooltip);

  // Circles
  var circles = svg.selectAll("circle")
                  .data(datasetReady)
                  .enter()
                  .append("circle")
                    .attr("cx", function(d) { return xScale(d.value['Opkomst']); })
                    .attr("cy", function(d) { return yScale(d.value['Forum voor Democratie']); })
                    .attr('r', 8)
                    .style("fill", "#69b3a2")
                    .style("opacity", 0.3)
                    .style("stroke", "white")
  // Call X-axis
  svg.append("g")
      .attr("class", "axis")
      .attr("id", "xAxis")
      .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .append("text")
      .attr('id', 'xAxisLabel')
      .attr('y', -10)
      .attr('x', width)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Opkomst')

  // Call Y-axis
  svg.append('g')
      .attr('class', 'axis')
      .attr('id', 'yAxis')
    .call(yAxis)
    .append('text') // y-axis Label
      .attr('id', 'yAxisLabel')
      .attr('transform', 'rotate(-90)')
      .attr('x', 0)
      .attr('y', 5)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Forum voor Democratie')

  // Initiate tooltip
  svg.selectAll("circle")
      .on("mouseover", tooltip.show)
      .on("mouseout", tooltip.hide);

  function xChange() {
    var value = this.value // Get new x value
    xScale.domain([
        d3.min([0,d3.min(datasetReady,function (d) { return d.value[value] })]),
        d3.max([0,d3.max(datasetReady,function (d) { return d.value[value] })])
        ])
    xAxis.scale(xScale) // Change the X scale
    d3.select("#xAxis") // Redraw X-axis
      .transition().duration(300)
      .call(xAxis)
    d3.select("#xAxisLabel")  // Change X-axis labels
      .transition().duration(300)
      .text(value)
    d3.selectAll("circle") // Move the circles
      .transition().duration(300)
      .delay(function(d, i) { return i * 100; })
        .attr("cx", function(d) { return xScale(d.value[value]); })
  }
}
