(function () {
  Asteroids = Asteroids || {}

  var Ship = Asteroids.Ship = function(config) {
    config.vel = [0,0];
    config.radius = Ship.RADIUS;
    config.color = Ship.COLOR;
    Asteroids.MovingObject.call(this, config);
  }

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.RADIUS = 10;
  Ship.COLOR = "blue";
  Ship.MAX_VEL = 4;

  Ship.prototype.fireBullet = function(){
    var bullet = new Asteroids.Bullet({
      pos: this.pos.slice(),
      vel: [this.vel[0] * 2, this.vel[1] * 2],
      game: this.game
    });

    this.game.bullets.push(bullet);
  }

  Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  }

  Ship.prototype.power = function(impulse){
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];

    if (this.vel[0] > Ship.MAX_VEL) {
      this.vel[0] = Ship.MAX_VEL;
    } else if (this.vel[0] < -Ship.MAX_VEL) {
      this.vel[0] = -Ship.MAX_VEL
    }

    if (this.vel[1] > Ship.MAX_VEL) {
      this.vel[1] = Ship.MAX_VEL;
    } else if (this.vel[1] < -Ship.MAX_VEL) {
      this.vel[1] = -Ship.MAX_VEL
    }
  }
})();
