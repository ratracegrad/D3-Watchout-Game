// start slingin' some d3 here.
function playGame(){

  function drawPiece(color, radius,x,y,pieceType) {
      var circle = svgContainer.append("circle")
        .attr("cx", Math.floor(Math.random() * 900))
        .attr("cy", Math.floor(Math.random() * 400))
        .attr("style", "fill:" + color)
        .attr("class", pieceType)
        .attr("r", 20);

        if(pieceType === "asteroid"){
          setInterval(function(){
            circle.transition()
            .duration(750)
            .attr("cx", Math.floor(Math.random() * 900))
            .attr("cy", Math.floor(Math.random() * 400));
          }, 1000);
        }
        return circle;
    }

  function moveAsteroid(asteroid,d, x, y, speed){
    setInterval(function(){
          asteroid.transition()
          .duration(d)
          .attr("cx", x)
          .attr("cy", y);
        }, speed);
  }

  var drag = d3.behavior.drag()  
     .on('dragstart', function() { player.style('fill', 'red'); })
     .on('drag', function() { player.attr('cx', d3.event.x)
                                    .attr('cy', d3.event.y); })
     .on('dragend', function() { player.style('fill', 'violet'); });

  var svgContainer = d3.select(".gameBoard").append("svg")
       .attr('class', 'box');
       // .attr("width", 500)
       // .attr("height", 300);

  var asteroidArray =[]

  for(var i = 0; i < 10; i++){
  
   asteroidArray.push(drawPiece("steelblue",25,Math.floor(Math.random() * 900)
                           ,Math.floor(Math.random() * 400), "asteroid"));
  }
  // for(var i=0; i <10; i++){
  //   moveAsteroid(asteroidArray[i], 750, Math.floor(Math.random() * 900),
  //                                     Math.floor(Math.random() * 400), 1000)
  // }

  var player = drawPiece("violet", 20, 500, 200, "player").call(drag);

}


playGame();


