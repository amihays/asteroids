(function(){
  Asteroids = Asteroids || {};

  Asteroids.Util = {
    inherits: function(childClass, parentClass){
      function Surrogate(){}
      Surrogate.prototype = parentClass.prototype;
      childClass.prototype = new Surrogate();
      childClass.prototype.constructor = childClass;
    },
    randomVec: function(length) {
      var x_vec = length * Math.random() * this.sample([-1,1]);
      var y_vec = Math.sqrt((length * length) - (x_vec * x_vec)) * this.sample([-1,1]);
      return [x_vec, y_vec]; // may want to round
    },
    sample: function(array) {
      return array[Math.floor(Math.random()*array.length)];
    },
    distanceFrom: function(pos1, pos2) {
      diffX = pos1[0] - pos2[0]
      diffY = pos1[1] - pos2[1]
      return Math.sqrt((diffX * diffX) + (diffY * diffY));
    }
  }
})();
