/**
* Object Builder for Prototyping
*/
objectBuilder = function (proto_object) {
  var F = function(){};
  F.prototype = proto_object;
  return new F();
};

generateKeyValuePair = function (key, value) {
	var pair = { };
	pair[key] = value;
	return pair;
}

logKeyValues = function (name, object) {
	console.log('Logging keys and values for ' + name);
	for (key in object) {
		console.log('Key: ' + key + ', Value: ' + object[key]);
	}
	console.log('Finished logging.');
}

/**
* Functions that involve objects and their properties
*/
var objectFuncs = {};

objectFuncs.contains = function (collection, value) {
	var contains = false;
	for (key in collection) {
		if (collection[key] === value) {
			contains = true;
		}
	}
	return contains;
}

/**
* Functions that involve arrays and their properties
*/
var arrayFuncs = {};

arrayFuncs.remove = function (collection, value) {
	var contains = false;

	for (var i = 0; i < collection.length; i++) {
		if (collection[i] === value) {
			contains = true; 
		}
		if (contains) {
			collection[i] = collection[i+1];
		}
	}
	collection.length = collection.length - 1;
	return contains;
};

arrayFuncs.removeAtIndex = function (collection, index) {
	for (var i = index; i < collection.length; i++) {
			collection[i] = collection[i+1];
	}
	collection.length = collection.length - 1;
};


