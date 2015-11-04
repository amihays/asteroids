(function () {
  Asteroids = Asteroids || {}

  var Ship = Asteroids.Ship = function(config) {
    this.direction = 0; // in radians, 0 is up
    config.vel = [0, 0];
    config.radius = Ship.RADIUS;
    config.color = Ship.COLOR;
    Asteroids.MovingObject.call(this, config);
    this.immunity = 0; // immunity seconds left
    this.setShipImage();
  }

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.RADIUS = 15;
  Ship.COLOR = "blue";
  Ship.MAX_SPEED = 7;

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

  Ship.prototype.setShipImage = function () {
    this.shipImage = new Image();
    this.shipImage.src = "images/spaceship.png";
  }

  Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
    this.direction = 0;
  }

  Ship.prototype.handleCrash = function () {
    if (this.immunity <= 0) {
      this.relocate();
      this.addImmunityTime();
    }
  }

  Ship.prototype.move = function(){
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.vel[0] += this.force[0] / this.mass;
    this.vel[1] += this.force[1] / this.mass;
    this.force = [0, 0];
    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isWrappable) {
        this.pos = this.game.wrap(this.pos);
      } else {
        this.game.remove(this);
      }
    }
    if (this.immunity > 0) {
      // debugger;
      this.immunity -= 1;
    }
  }


  Ship.prototype.addImmunityTime = function () {
    this.immunity = 50; // 2 seconds
  }

  Ship.prototype.draw = function (ctx) {
    // ctx.fillStyle = this.color;
    // ctx.beginPath();
    //
    // ctx.arc(this.pos[0], //x pos
    //         this.pos[1], //y pos
    //         this.radius,
    //         0,
    //         Math.PI * 2,
    //         false);
    // ctx.fill();
    //
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.direction + (Math.PI / 4));
    var scalar = (this.radius * 2 / 400);
    ctx.drawImage(this.shipImage,
                  0,
                  0,
                  596,
                  574,
                  scalar * (-(this.shipImage.width / 2)),
                  scalar * (-(this.shipImage.height / 2 - 20)),
                  this.shipImage.width * scalar,
                  this.shipImage.height * scalar);
    ctx.restore();
  }

  Ship.prototype.speed = function () {
    return Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2));
  }

  Ship.prototype.setVelocity = function (speed) {
    var direction_vector = [Math.cos(this.direction), Math.sin(this.direction)];
    this.vel = [direction_vector[0] * speed, direction_vector[1] * speed];
  }

  Ship.prototype.turn = function (diff) { // diff = -1 || 1
    this.direction += (diff * Math.PI / 8);
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
