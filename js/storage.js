/**
* Functions for manipulating the Chrome storage namespaces.
*/
var storage = { }

storage.keys = { };
storage.keys.regions = 'regions';

storage.get = function(item, callback) {
	chrome.storage.local.get(item, callback);
};

storage.set = function(keyPair) {
	chrome.storage.local.set(keyPair, function() {
		for (key in keyPair) {
			console.log('Set ' + key + ' as value ' + keyPair[key]);
		}
	});
}

storage.load = function(defaultRegion) {
	storage.loadSummoners(defaultRegion);
};

storage.loadSummoners = function(region) {
	var defaultOption = view.defaults.summonerListOption;
	$(view.components.summonerSelectList).html(defaultOption);
	storage.get(storage.keys.regions, function(result) {
		var regions = result.regions;
		var storedRegion = regions[region];
		var isUndefined = typeof (storedRegion) === 'undefined';
		if (!isUndefined) {
			storedRegion.forEach(storage.loadSummoner);
		}
	});
};

storage.loadSummoner = function(summoner) {
	var option = '<option value="' + summoner + '">' + summoner + '</option>';
	$(view.components.summonerSelectList).append(option);
};

storage.storeSummoner = function(region, summoner) {
	storage.get(storage.keys.regions, function(result) {
		var regions = result.regions;
		var size = regions[region].length;
		if (objectFuncs.contains(regions[region], summoner)) {
			alert (summoner + ' is already added!');
		} else {
			regions[region][size] = summoner;
		  	var pair = generateKeyValuePair(storage.keys.regions, regions);
		  	storage.set(pair);
		  	storage.loadSummoners(region);
		}
	});
};

storage.removeSummoner = function(region, summoner) {
	storage.get(storage.keys.regions, function(result) {
		var regions = result.regions;
		logKeyValues('regions[region]', regions[region]);
		if (objectFuncs.contains(regions[region], summoner)) {
			arrayFuncs.remove(regions[region], summoner);
		  	var pair = generateKeyValuePair(storage.keys.regions, regions);
		  	storage.set(pair);
		  	storage.loadSummoners(region);
		} else {
			alert (summoner + ' is not added!');
		}
	});
}

storage.initRegions = function() {
	storage.get(storage.keys.regions, function(result) {
		var regions = result.regions;
		if (typeof regions === 'undefined') {
			var regions = { };
			model.serverAbbreviations.forEach(function(abbr) {
				regions[abbr] = [];
			});
		  	var pair = generateKeyValuePair(storage.keys.regions, regions);
		  	storage.set(pair);
		}
	});
};

storage.init = function() {
	storage.initRegions();
	storage.load('NA');
	storage.setupFunctions();
};

storage.setupFunctions = function() {
	var submitButton = $('.summoner-selection input[type=submit]');
	var addSummonerField = $('.summoner-selection input[type=text]');

	submitButton.click(function() {
		var summonerName = addSummonerField.val();	
		var selectedRegion = $('.region-selection a.selected').text();

		if (summonerName && summonerName.length > 0) {
			externals.checkIfSummonerExists(selectedRegion, summonerName, storage.storeSummoner);
		}
	});

	chrome.storage.onChanged.addListener(function(changes, namespace) {
	 	for (key in changes) {
		    var storageChange = changes[key];
		    console.log(
		    	'Storage key "%s" in namespace "%s" changed. ' +
                'Old value was "%s", new value is "%s".',
                key,
                namespace,
                storageChange.oldValue,
                storageChange.newValue);
	  	}
	});
};