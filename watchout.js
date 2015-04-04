// start slingin' some d3 here.
window.hasCollided = false;
window.collisionClock = new Date();
window.lastCollided = collisionClock.getTime();

function playGame(){

  function drawPiece(color, radius,x,y,pieceType) {
      var circle = svgContainer.append("circle")
        .attr("cx", Math.floor(Math.random() * 900))
        .attr("cy", Math.floor(Math.random() * 400))
        .attr("style", "fill:" + color)
        .attr("class", pieceType)
        .attr("r", 20);
        

        if(pieceType === "asteroid"){

          var Asteroid = function(){
            this.circle = circle;
            this.timeid = null;
            // .tween('collisionDetection', function() {
            //   var check = setInterval(innerCheckCollision.bind(this),1);
            //   setTimeout(function() {
            //     clearInterval(check);
            //   }, stepInterval);
            // })
        
          
          }
          Asteroid.prototype = {
            stop: function(){
              clearInterval(this.timeid);
              clearInterval(this.collisionID)
            },
            start: function(){
                 this.timeid = setInterval(this._move.bind(this), 2000);
                 this.collisionID = setInterval(this._collision.bind(this), 1);
                 //this.circle.on('tick', this._collision.bind(this));
            },
            _move: function(){
                 this.circle.transition()
                .duration(750)
                .attr("cx", Math.floor(Math.random() * 900))
                .attr("cy", Math.floor(Math.random() * 400));
            },
            _change: function(){
              this.circle.style('fill', 'black')
            },
            _collision: function(){
                collisionClock = new Date();
                if(collisionClock.getTime() > lastCollided + 2000){
                  var asteroidX = this.circle.attr('cx');
                  var playerX = player.attr('cx');
                  var asteroidY = this.circle.attr('cy');
                  var playerY = player.attr('cy');

                  if ( (Math.abs(playerX - asteroidX) <= 30) && (Math.abs(playerY - asteroidY) <= 30)){
                    var collisionTot = (parseInt(d3.select('.collisions span').text()) + 1).toString();
                    d3.select('.collisions span').text(function(){ return collisionTot; });
                    lastCollided = collisionClock.getTime();
                  }
                }
            }
          }         
          

          var asteroid = new Asteroid();

          asteroid.start()
          return asteroid;
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

  var player = drawPiece("violet", 20, 500, 200, "player").call(drag);
}


playGame();

