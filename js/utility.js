/**
* For the functions without a true home
*/
var utility = {

	/**
	* Object Builder for Prototyping
	*/
	objectBuilder: function (proto_object) {
	  var F = function(){};
	  F.prototype = proto_object;
	  return new F();
	},

	/**
	* Generates a keyValuePair object with the specified key and value
	*/
	generateKeyValuePair: function (key, value) {
		var pair = { };
		pair[key] = value;
		return pair;
	},

	/**
	* Logs each key and value in the specified object
	*/
	logKeyValues: function (name, object) {
		console.log('Logging keys and values for ' + name);
		for (key in object) {
			console.log('Key: ' + key + ', Value: ' + object[key]);
		}
		console.log('Finished logging.');
	},

	/**
	* Functions that involve objects and their properties
	*/
	objectFuncs: {
		contains: function (collection, value) {
			var contains = false;
			for (key in collection) {
				if (collection[key] === value) {
					contains = true;
				}
			}
			return contains;
		}
	},

	/**
	* Functions that involve arrays and their properties
	*/
	arrayFuncs: {
		remove: function (collection, value) {
			var contains = false;

			for (var i = 0; i < collection.length; i++) {
				if (collection[i] === value) {
					contains = true; 
				}
				if (contains) {
					collection[i] = collection[i+1];
				}
			}
			collection.length -= 1;
			return contains;
		},

		/*
		* Removes an element at the specified index
		*/
		removeAtIndex: function (collection, index) {
			for (var i = index; i < collection.length; i++) {
					collection[i] = collection[i+1];
			}
			collection.length -= 1;
		},

		/*
		* Removes a subcollection from a collection
		*/
		removeCollection: function(collection, toRemove) {
			for (var i = 0; i < toRemove.length; i++) {
				var found = false;
				for (var j = 0; j < collection.length; j++) {
					if (collection[j] === toRemove[i]) {
						found = true;
					}
					if (found) {
						collection[j] = collection[j + 1];
					}
				}
				if (found) collection.length -= 1;
			}
		}
	},

	/**
	* Functions that use regex
	*/
	regexFuncs: {
		removeScript: function(data) {
			data = data.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
			return data;
		},

		removeImg: function(data) {
			data = data.replace(/<img\b.*?>/gi, '');
			return data;
		},

		removeLink: function(data) {
			data = data.replace(/<link\b.*?\/?>/gi, '');
			return data;
		},

		removeNoScript: function(data) {
			data = data.replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, '');
			return data;
		},

		removeSelect: function(data) {
			data = data.replace(/<select\b[^<]*(?:(?!<\/select>)<[^<]*)*<\/select>/gi, '');
			return data;
		}
	}
}