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
    }
  }
})();
