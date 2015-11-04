(function () {
  Asteroids = Asteroids || {}

  var Ship = Asteroids.Ship = function(config) {
    this.direction = 0; // in radians, 0 is up
    config.vel = [0, 0];
    config.radius = Ship.RADIUS;
    config.color = Ship.COLOR;
    Asteroids.MovingObject.call(this, config);
  }

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.RADIUS = 10;
  Ship.COLOR = "blue";
  Ship.MAX_SPEED = 4;

  Ship.prototype.fireBullet = function(){
    var fireDir = [Math.cos(this.direction), Math.sin(this.direction)];
    var bullet = new Asteroids.Bullet({
      pos: this.pos.slice(),
      vel: [10 * Math.cos(this.direction), 10 * Math.sin(this.direction)],
      // vel: [this.vel[0] * 2, this.vel[1] * 2],
      game: this.game
    });

    this.game.bullets.push(bullet);
  }

  Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
    this.direction = 0;
  }

  Ship.prototype.speed = function () {
    return Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2));
  }

  Ship.prototype.setVelocity = function (speed) {
    var direction_vector = [Math.cos(this.direction), Math.sin(this.direction)];
    this.vel = [direction_vector[0] * speed, direction_vector[1] * speed];
  }

  Ship.prototype.turn = function (diff) { // diff = -1 || 1
    this.direction += (diff * Math.PI / 4);
    this.setVelocity(this.speed());
  }

  Ship.prototype.power = function(impulse){

    // velocity needs to always be in direction ship faces!
    // get speed from this.vel (magnitude of this.vel)
    // speed += impulse (single number)
    // this.vel = this.direction (unit vector) * speed
    var speed = this.speed();
    speed += impulse;
    if (speed < 0) {
      speed = 0
    } else if (speed > Ship.MAX_SPEED) {
      speed = Ship.MAX_SPEED;
    }
    this.setVelocity(speed);
    // this.vel[0] += impulse[0];
    // this.vel[1] += impulse[1];
    //
    // if (this.vel[0] > Ship.MAX_VEL) {
    //   this.vel[0] = Ship.MAX_VEL;
    // } else if (this.vel[0] < -Ship.MAX_VEL) {
    //   this.vel[0] = -Ship.MAX_VEL
    // }
    //
    // if (this.vel[1] > Ship.MAX_VEL) {
    //   this.vel[1] = Ship.MAX_VEL;
    // } else if (this.vel[1] < -Ship.MAX_VEL) {
    //   this.vel[1] = -Ship.MAX_VEL
    // }
  }
})();
