(function(){
  Asteroids = Asteroids || {};

  var Game = Asteroids.Game = function(){
    this.asteroids = [];
    this.bullets = [];
    this.addAsteroids();
    this.ship = new Asteroids.Ship({game: this, pos: [(Game.DIM_X / 2), (Game.DIM_Y / 2)] });
    this.setBackgroundImage();
  }

  canvas = document.getElementById("game-canvas");
  Game.NUM_ASTEROIDS = 6;
  Game.DIM_X = window.innerWidth;
  Game.DIM_Y = window.innerHeight;

  Game.prototype.setBackgroundImage = function () {
    this.backgroundImage = new Image();
    this.backgroundImage.src = "images/outer_space_background.jpg";
  }

  Game.prototype.isOutOfBounds = function(pos) {
    return (pos[0] < 0 || pos[1] < 0 ||
      pos[0] > Game.DIM_X || pos[1] > Game.DIM_Y);
  }

  Game.prototype.addAsteroids = function(){
    for(var i= 0; i < Game.NUM_ASTEROIDS; i+=1){
      this.asteroids.push(
        new Asteroids.Asteroid({game: this, pos: this.randomPosition() })
      )
    }
  }

  Game.prototype.addAsteroidPair = function (radius, pos, velocity) {
    // debugger;
    this.asteroids.push(new Asteroids.Asteroid({game: this, pos: pos.slice(), radius: radius, vel: velocity.slice()}));
    this.asteroids.push(new Asteroids.Asteroid({game: this, pos: pos.slice(), radius: radius, vel: [velocity[0], -velocity[1]]}))
  }

  Game.prototype.draw = function(ctx){
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    ctx.drawImage(this.backgroundImage, 0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(function(asteroid){
      asteroid.draw(ctx);
    });
  }

  Game.prototype.moveObjects = function(){
    this.allObjects().forEach(function(asteroid){
      asteroid.move();
    });
  }

  Game.prototype.randomPosition = function(){
    var xPos = Math.random() * Game.DIM_X;
    var yPos = Math.random() * Game.DIM_Y;
    return [xPos, yPos];
  }

  Game.prototype.wrap = function(pos){
    var newX = pos[0] % Game.DIM_X;
    var newY = pos[1] % Game.DIM_Y;

    if(newX < 0){ newX += Game.DIM_X }
    if(newY < 0){ newY += Game.DIM_Y }

    return [newX, newY];
  }

  Game.prototype.checkCollisions = function() {
    var collisions = [];
    for (var i = 0; i < this.allObjects().length; i++){
      for (var j = i + 1; j < this.allObjects().length; j++){
        if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
          collisions.push([this.allObjects()[i],this.allObjects()[j]]);
        }
      }
    }

    for(var k = 0; k < collisions.length; k+=1){
      collisions[k][0].collideWith(collisions[k][1])
    }
  }

  Game.prototype.applyGravity = function() {
    var unitVector = function (pos1, pos2) {
      var x = pos2[0] - pos1[0];
      var y = pos2[1] - pos1[1];
      var mag = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
      return [x/mag , y/mag, mag];
    }

    var gravForce = function (obj1, obj2) {
      var unitVec = unitVector(obj1.pos, obj2.pos);
      var r = unitVec[2];
      if (r < 5) { return [0, 0]; }
      var dir = [unitVec[0], unitVec[1]];
      var mass_product = obj1.mass * obj2.mass;
      var mag = mass_product / r;
      return [dir[0] * mag, dir[1] * mag];
    }

    for (var i = 0; i < this.allObjects().length; i++) {
      for (var j = i + 1; j < this.allObjects().length; j++) {
        var obj1 = this.allObjects()[i];
        var obj2 = this.allObjects()[j];
        var force = gravForce(obj1, obj2);
        obj1.force = force.slice();
        obj2.force = [-force[0], -force[1]];
        // debugger;
      }
    }
  }

  Game.prototype.step = function(ctx){
    this.moveObjects();
    this.draw(ctx);
    this.checkCollisions();
    // this.applyGravity();
  }

  Game.prototype.remove = function(object){
    if (object instanceof Asteroids.Asteroid) {
      this.asteroids.splice(this.asteroids.indexOf(object), 1);
    } else if (object instanceof Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else {
      console.log("That's weird")
    }
  }

  Game.prototype.allObjects = function(){
    return this.bullets.concat(this.asteroids).concat([this.ship]);
  }
})();
