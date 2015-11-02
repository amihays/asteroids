(function () {
  window.Asteroids = window.Asteroids || {};

  var MovingObject = Asteroids.MovingObject = function(config) {
    this.pos = config["pos"];
    this.vel = config["vel"];
    this.radius = config["radius"];
    this.color = config["color"];
    this.game = config["game"];
    this.mass = this.radius / 2;
    this.force = [0, 0];
  }

  MovingObject.prototype.isWrappable = true;

  MovingObject.prototype.draw = function(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(this.pos[0], //x pos
            this.pos[1], //y pos
            this.radius,
            0,
            Math.PI * 2,
            false);
    ctx.fill();
  }

  MovingObject.prototype.move = function(){
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
  }

  MovingObject.prototype.isCollidedWith = function(otherObject){
    var distance = Asteroids.Util.distanceFrom(this.pos, otherObject.pos);
    if (distance < (this.radius + otherObject.radius)) {
      return true;
    }
  }

  MovingObject.prototype.collideWith = function(otherObject){
  }
})();
