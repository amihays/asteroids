(function () {
  window.Asteroids = window.Asteroids || {};

  var MovingObject = Asteroids.MovingObject = function(config) {
    this.pos = config["pos"];
    this.vel = config["vel"];
    this.radius = config["radius"];
    this.color = config["color"];
  }

  MovingObject.prototype.draw = function(ctx){
    ctx.fillColor = this.color;
    ctx.arc(this.pos[0], //x pos
            this.pos[1], //y pos
            this.radius,
            0,
            Math.PI * 2);

    ctx.fill();
  }

  MovingObject.prototype.move = function(){
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }
})();
