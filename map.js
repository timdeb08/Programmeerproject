// Set margin, width, height
const margin = {top: 0, right: 0, bottom: 0, left: 0};
const width = 600 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// Initiate svg element
const svg = d3v3.select('#map')
              .append('svg')
                .attr('width', width)
                .attr('height', height)

// Define geographical projection
var projection = d3v3.geo.mercator()
                  .scale(1);

// Prepare a path object and apply the projection to it
var path = d3v3.geo.path()
            .projection(projection);

// Load the features from the GEOjson
d3v3.json('/scripts/gemeentegrenzen.geojson', function(error, features) {

  // Get the scale and center parameters from features
  var scaleCenter = calculateScaleCenter(features);

  // Apply scale center and translate parameters
  projection.scale(scaleCenter.scale)
    .center(scaleCenter.center)
    .translate([width / 2, height / 2]);

  // Read the data from dataset
  d3v3.json('/scripts/verkiezing.json', function(data) {

    // Add a 'g' element to the SVG element
    svg.append('g')
        .attr('class', 'features')
      .selectAll('path')
      .data(features.features)
      .enter().append('path')
        .attr('d', path);
  })

})

function calculateScaleCenter(features) {

  var bbox_path = path.bounds(features),
      scale = 0.95 / Math.max(
        (bbox_path[1][0] - bbox_path[0][0]) / width,
        (bbox_path[1][1] - bbox_path[0][1]) / height
      );

  var bbox_feature = d3v3.geo.bounds(features),
      center = [
        (bbox_feature[1][0] + bbox_feature[0][0]) / 2,
        (bbox_feature[1][1] + bbox_feature[0][1]) / 2];

  return {
    'scale': scale,
    'center': center
  };
}
