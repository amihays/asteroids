(function(){
  Asteroids = Asteroids || {};

  var Asteroid = Asteroids.Asteroid = function(config){
    config.vel = Asteroids.Util.randomVec(15);
    config.color = Asteroid.COLOR;
    config.radius = Asteroid.RADIUS;
    MovingObject.call(this,config);
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.COLOR = "#FF0000";
  Asteroid.RADIUS = 15;


})();
