(function(){
  Asteroids = Asteroids || {};

  var Asteroid = Asteroids.Asteroid = function(config){
    config.vel = Asteroids.Util.randomVec(2);
    config.color = Asteroid.COLOR;
    config.radius = Asteroid.RADIUS;
    Asteroids.MovingObject.call(this,config);
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.COLOR = "red";
  Asteroid.RADIUS = 20;

  Asteroid.prototype.collideWith = function(otherObject) {
    if( otherObject instanceof Asteroids.Ship){
      otherObject.relocate();
    }
  }

  Asteroid.prototype.remove = function(){
    this.game.asteroids.splice(this.game.asteroids.indexOf(this), 1);
  }

})();
