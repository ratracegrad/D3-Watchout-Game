var svgContainer = d3.select("body").append("svg")
     .attr("width", 960)
     .attr("height", 500);

function drawAsteroids() {
    var circle = svgContainer.append("circle")
      .attr("cx", Math.floor(Math.random() * 900))
      .attr("cy", Math.floor(Math.random() * 400))
      .attr("style", "fill:steelblue;")
      .attr("r", 20);

      setInterval(function(){
        circle.transition()
        .duration(750)
        .attr("cx", Math.floor(Math.random() * 900))
        .attr("cy", Math.floor(Math.random() * 400));
      }, 1000);

};

for (var i = 0; i < 10; i++) {
  drawAsteroids();
}
