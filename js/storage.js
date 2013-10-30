var storage = { }

storage.keys = { };
storage.keys.regions = 'regions';

storage.load = function(region) {
	storage.loadSummoners(region);
};

storage.loadSummoners = function(region) {
	storage.get(storage.keys.regions, function(result) {
		console.log("Result: " + result);
		console.log("Result.regions: " + result.regions);
		var regions = result.regions;
		var storedRegion = regions[region];
		console.log("storedregion: " + storedRegion);
		var isUndefined = typeof (storedRegion) === 'undefined';
		if (!isUndefined) {
			storedRegion.forEach(storage.loadSummoner);
		}
	});
};

storage.loadSummoner = function(summoner) {
	var option = '<option value="' + summoner + '">' + summoner + '</option>';
	$('.summoner-selection select').append(option);
};

storage.storeSummoner = function(region, summoner) {
	storage.get(storage.keys.regions, function(result) {
		var regions = result.regions;
		if (typeof regions[region] === 'undefined') {
			console.log(region + ' was undefined');
			regions[region] = [];
		}
		var newRegion = regions[region];
		var size = newRegion.length;
		newRegion[size] = summoner;
		regions[region] = newRegion;
		console.log('regions: ' + regions + ' region: ' + newRegion + ' object: ' + newRegion[size]);
	  	storage.set('regions', regions);
	  	storage.loadSummoner(summoner);
	});
}

storage.init = function() {
	storage.get(storage.keys.regions, function(result) {
		var regions = result.regions;
		if (typeof regions === 'undefined') {
			var regions = { };
			model.serverAbbreviations.forEach(function(abbr) {
				regions[abbr] = [];
			});
			storage.set(storage.keys.regions, regions);
		}
	});

	storage.load('NA');
	storage.setupFunctions();
}

storage.setupFunctions = function() {
	var submitButton = $('.summoner-selection input[type=submit]');
	var addSummonerField = $('.summoner-selection input[type=text]');

	submitButton.click(function() {
		var summonerName = addSummonerField.val();	
		var selectedRegion = $('.region-selection a.selected').text();

		if (summonerName && summonerName.length > 0) {
			externals.checkIfSummonerExists(selectedRegion, summonerName);
		}
	});

	chrome.storage.onChanged.addListener(function(changes, namespace) {
	 	for (key in changes) {
		    var storageChange = changes[key];
		    console.log('Storage key "%s" in namespace "%s" changed. ' +
		                'Old value was "%s", new value is "%s".',
		                key,
		                namespace,
		                storageChange.oldValue,
		                storageChange.newValue);
		  	}
		});
	};

storage.get = function(item, callback) {
	chrome.storage.local.get(item, callback);
};

storage.set = function(item, value) {
	chrome.storage.local.set({item: value}, function() {
		console.log(item.toString() + ' set to ' + value.toString());
	});
}