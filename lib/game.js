(function(){
  Asteroids = Asteroids || {};

  var Game = Asteroids.Game = function(){
    this.asteroids = [];
    this.addAsteroids();
  }

  Game.DIM_X = window.innerWidth;
  Game.DIM_Y = window.innerHeight;
  Game.NUM_ASTEROIDS = 10;

  Game.prototype.addAsteroids = function(){
    for(var i= 0; i < Game.NUM_ASTEROIDS; i+=1){
      this.asteroids.push(
        new Asteroids.Asteroid({ pos: this.randomPosition })
      )
    }
  }

  Game.prototype.draw = function(ctx){
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.asteroids.forEach(function(asteroid){
      asteroid.draw(ctx);
    });
  }

  Game.prototype.moveObjects = function(){
    this.asteroids.forEach(function(asteroid){
      asteroid.move();
    });
  }

  Game.prototype.randomPosition = function(){
    var xPos = Math.random() * Game.DIM_X;
    var yPos = Math.random() * Game.DIM_Y;
    return [xPos, yPos];
  }
})();
