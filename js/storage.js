/**
* Functions for manipulating the Chrome storage namespaces.
*/
var storage = { 
	keys: { 
		regions: 'regions'
	},

	fn: {
		get: function(item, callback) {
			chrome.storage.local.get(item, callback);
		},

		set: function(keyPair, callback) {
			chrome.storage.local.set(keyPair, callback);
		},

		load: function(region) {
			storage.fn.loadSummoners(region);
		},

		loadSummoners: function(region) {
			var defaultOption = view.defaults.summonerList;
			$(view.components.summonerSelectList).html(defaultOption);
			var regionKey = storage.keys.regions; 
			storage.fn.get(regionKey, function(result) {
				var regions = result.regions;
				if (regions != undefined) {
					var storedRegion = regions[region];
					var isUndefined = typeof (storedRegion) === 'undefined';
					if (!isUndefined) {
						storedRegion.forEach(storage.fn.loadSummoner);
					}
				} else {
					storage.initRegions();
					storage.fn.loadSummoners(region);
				}
			});
		},

		loadSummoner: function(summoner) {
			var ltFunctions = externals.lolTeam.fn;
			var selectedRegion = $(view.components.selectedRegion).text();		
			ltFunctions.isSummonerInGame(selectedRegion, summoner, 
				function(summoner, data) {			
					var scraped = $(data);
					var option = '<option value="' + summoner + '">' + summoner + '</option>';
					if (ltFunctions.doesGameExist(scraped)) {
						$(view.components.inGameGroup).append(option);
					} else {
						$(view.components.notInGameGroup).append(option);
					}
				},
				function(requestUrl) {
					view.hideStatus();
					view.displayAlert('An error occurred while retrieving data from www.lolteam.com.');
				}
			);
		},

		getSummoners: function(region, callback) {
			storage.fn.get(storage.keys.regions, function(result) {
				var regions = result.regions;
				var storedRegion = regions[region];
				var isUndefined = typeof (storedRegion) === 'undefined';
				if (!isUndefined) {
					callback(storedRegion);
				}
			});
		},

		storeSummoner: function(region, summoner) {
			storage.fn.get(storage.keys.regions, function(result) {
				var regions = result.regions;
				var size = regions[region].length;
				if (utility.objectFuncs.contains(regions[region], summoner)) {
					alert (summoner + ' is already added!');
				} else {
					regions[region][size] = summoner;
				  	var pair = utility.generateKeyValuePair(storage.keys.regions, regions);
				  	storage.fn.set(pair);
				  	storage.fn.loadSummoners(region);
				  	$(view.components.addSummonerField).val('');
				}
			});
		},

		removeSummoner: function(region, summoner) {
			storage.fn.get(storage.keys.regions, function(result) {
				var regions = result.regions;
				if (utility.objectFuncs.contains(regions[region], summoner)) {
					utility.arrayFuncs.remove(regions[region], summoner);
				  	var pair = utility.generateKeyValuePair(storage.keys.regions, regions);
				  	storage.fn.set(pair, function() {
					  	storage.fn.loadSummoners(region);
				  	});
				} else {
					alert (summoner + ' is not added!');
				}
			});
		},
	},

	initRegions: function() {
		storage.fn.get(storage.keys.regions, function(result) {
			var regions = result.regions;
			if (typeof regions === 'undefined') {
				var regions = { };
				model.serverAbbreviations.forEach(function(abbr) {
					regions[abbr] = [];
				});
			  	var pair = utility.generateKeyValuePair(storage.keys.regions, regions);
			  	storage.fn.set(pair);
			}
		});
	},

	init: function() {
		storage.initRegions();
		storage.fn.load('NA');
		storage.setupFunctions();
	},

	handlers: {
		addSummoner: function() {
			var submitButton = $(view.components.addSummonerButton);
			var addSummonerField = $(view.components.addSummonerField);
			var summonerName = addSummonerField.val();	
			var selectedRegion = $(view.components.selectedRegion).text();

			if (summonerName && summonerName.length > 0) {
				externals.lolKing.fn.checkIfSummonerExists(selectedRegion, summonerName, storage.fn.storeSummoner);
			}
		}
	},

	setupFunctions: function() {
		$(view.components.addSummonerButton).click(storage.handlers.addSummoner);
		
		$(view.components.addSummonerField).keypress(function() {
			if (event.which == 13) {
				storage.handlers.addSummoner();
			}
		});
	}
}