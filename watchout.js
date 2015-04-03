var svgContainer = d3.select("body").append("svg")
     .attr("width", 960)
     .attr("height", 500);

function drawAsteroids() {
    var circle = svgContainer.append("circle")
      .attr("cx", Math.floor(Math.random() * 400))
      .attr("cy", Math.floor(Math.random() * 300))
      .attr("style", "fill:steelblue;")
      .attr("r", 20);
};

for (var i = 0; i < 10; i++) {
  drawAsteroids();
}