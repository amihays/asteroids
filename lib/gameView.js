(function () {
  Asteroids = Asteroids || {};

  var GameView = Asteroids.GameView = function(ctx) {
    this.game = new Asteroids.Game();
    this.ctx = ctx;
  }

  GameView.prototype.start = function(){
    var gameView = this;
    this.bindKeyHandlers();
    setInterval(function(){
      gameView.game.step(gameView.ctx);
    }, 20);
  }

  GameView.prototype.bindKeyHandlers = function(){
    var gameView = this;
    key("up", function(){ gameView.game.ship.power(1); return false; });
    key("down", function(){ gameView.game.ship.power(-1); return false; });
    key("left", function(){ gameView.game.ship.turn(-1); return false; });
    key("right", function(){ gameView.game.ship.turn(1); return false; });
    key("space", function(){ gameView.game.ship.fireBullet(); return false; });
  }
})();
