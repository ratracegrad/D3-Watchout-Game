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

function drawPlayer() {
  var drag = d3.behavior.drag()  
     .on('dragstart', function() { circle.style('fill', 'red'); })
     .on('drag', function() { circle.attr('cx', d3.event.x)
                                    .attr('cy', d3.event.y); })
     .on('dragend', function() { circle.style('fill', 'violet'); });

  var circle = svgContainer.append("circle")
      .attr("cx", Math.floor(Math.random() * 900))
      .attr("cy", Math.floor(Math.random() * 400))
      .attr("style", "fill:violet;")
      .attr("r", 20)
      .call(drag);
}


//-------------------------------------------------
//  Actual start playing of game below
//-------------------------------------------------
for (var i = 0; i < 10; i++) {
  drawAsteroids();
};

drawPlayer();


