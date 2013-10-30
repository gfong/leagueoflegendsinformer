/**
* Object Builder for Prototyping
*/
objectBuilder = function (proto_object) {
  var F = function(){};
  F.prototype = proto_object;
  return new F();
};