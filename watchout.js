// start slingin' some d3 here.
window.hasCollided = false;
window.collisionClock = new Date();
window.lastCollided = collisionClock.getTime();
window.playerScore = 0;

function playGame(){

  function drawPiece(color, radius,x,y,pieceType) {
        if(pieceType === "player"){
        var img = svgContainer.append("svg:image")
        .attr("xlink:href", "spacecat.png")
        .attr("x", 400)
        .attr("y", 200)
        .attr("width", 50)
        .attr("height", 50);
        }
//         TweenMax.to("#svg, #div", 2, {
//   rotation:360, 
//   transformOrigin:"50% 50%"
});

        if(pieceType === "asteroid"){

          var img = svgContainer.append("svg:image")
            .attr("xlink:href", "asteroid2.png")
            .attr("x", Math.floor(Math.random() * 900))
            .attr("y", Math.floor(Math.random() * 400))
            .attr("width", 50)
            .attr("height", 50);
          var Asteroid = function(){
            this.img = img;
            this.timeid = null;        
          
          }
          Asteroid.prototype = {
            stop: function(){
              clearInterval(this.timeid);
              clearInterval(this.collisionID)
            },
            start: function(){
                 this.img.attr("class", "asteroid");
                 this.timeid = setInterval(this._move.bind(this), 2000);
                 this.collisionID = setInterval(this._collision.bind(this), 1);
                 //this.img.on('tick', this._collision.bind(this));
            },
            _move: function(){
                 this.img.transition()
                .duration(750)
                .attr("x", Math.floor(Math.random() * 900))
                .attr("y", Math.floor(Math.random() * 400));
            },
            _change: function(){
              this.img.style('fill', 'black')
            },
            _collision: function(){
                collisionClock = new Date();
                if(collisionClock.getTime() > lastCollided + 2000){
                  var asteroidX = this.img.attr('x');
                  var playerX = player.attr('x');
                  var asteroidY = this.img.attr('y');
                  var playerY = player.attr('y');

                  if ( (Math.abs(playerX - asteroidX) <= 30) && (Math.abs(playerY - asteroidY) <= 30)){
                    var collisionTot = (parseInt(d3.select('.collisions span').text()) + 1).toString();
                    d3.select('.collisions span').text(function(){ return collisionTot; });
                    playerScore = 0;
                    d3.select('.current span').text(function(){ return playerScore; });
                    lastCollided = collisionClock.getTime();
                  }
                }
            }
          }         
          

          var asteroid = new Asteroid();

          asteroid.start()
          return asteroid;
        }
        return img;
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
     .on('drag', function() { player.attr('x', d3.event.x)
                                    .attr('y', d3.event.y); })
     .on('dragend', function() { player.style('fill', 'violet'); });

  var svgContainer = d3.select(".gameBoard").append("svg")
       .attr('class', 'box');

  var asteroidArray =[]

  for(var i = 0; i < 10; i++){
  
   asteroidArray.push(drawPiece("steelblue",25,Math.floor(Math.random() * 900)
                           ,Math.floor(Math.random() * 400), "asteroid"));
  }

  var player = drawPiece("violet", 20, 500, 200, "player").call(drag);
  setInterval(function(){
    playerScore += 1;
    d3.select('.current span').text(function(){ return playerScore; });
  }, 1000)
}


playGame();
