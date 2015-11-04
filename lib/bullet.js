(function() {
  var Bullet = Asteroids.Bullet = function(config){
    config.color = Bullet.COLOR;
    config.radius = Bullet.RADIUS;
    Asteroids.MovingObject.call(this, config);
  }

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.isWrappable = false;

  Bullet.prototype.remove = function(){
    this.game.bullets.splice(this.game.bullets.indexOf(this), 1);
  }

  Bullet.prototype.collideWith = function(otherObject){
    if(otherObject instanceof Asteroids.Asteroid){
      this.remove();
      otherObject.handleShot();
    }
  }

  Bullet.COLOR = "#999999";
  Bullet.RADIUS = 4;
})();
