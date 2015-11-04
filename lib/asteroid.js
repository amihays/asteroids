(function(){
  Asteroids = Asteroids || {};

  var Asteroid = Asteroids.Asteroid = function(config){
    config.vel = config['vel'] || Asteroids.Util.randomVec(2);
    config.color = Asteroid.COLOR;
    config.radius = config['radius'] || Asteroid.RADIUS;
    Asteroids.MovingObject.call(this,config);
    this.setAsteroidImage();
    this.setAngle();
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.COLOR = "red";
  Asteroid.RADIUS = 40;

  Asteroid.prototype.setAngle = function () {
    this.angle = Math.random() * 2 * Math.PI;
  }

  Asteroid.prototype.setAsteroidImage = function () {
    this.asteroidImage = new Image();
    this.asteroidImage.src = "images/asteroid.png"
  }

  Asteroid.prototype.collideWith = function(otherObject) {
    if(otherObject instanceof Asteroids.Ship){
      otherObject.handleCrash();
    }
  }

  Asteroid.prototype.remove = function(){
    this.game.asteroids.splice(this.game.asteroids.indexOf(this), 1);
  }

  Asteroid.prototype.handleShot = function () {
    if (this.radius > 20) {
      this.game.addAsteroidPair(this.radius * (2 / 3), this.pos, this.vel);
    }
    this.game.asteroids.splice(this.game.asteroids.indexOf(this), 1);
  }

  Asteroid.prototype.draw = function () {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.angle);
    var scalar = (this.radius * 2 / 290);
    ctx.drawImage(this.asteroidImage,
                  0,
                  0,
                  290,
                  290,
                  scalar * (-(this.asteroidImage.width / 2)),
                  scalar * (-(this.asteroidImage.height / 2 - 20)),
                  this.asteroidImage.width * scalar,
                  this.asteroidImage.height * scalar);
    ctx.restore();
  }

})();
