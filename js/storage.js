/**
* Functions for manipulating the Chrome storage namespaces.
*/
var storage = { 
	keys: { 
		regions: 'regions'
	},

	counters: {
		loadingSummoners: 0
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
			view.displayStatus("Loading summoners...");
			var defaultOption = view.defaults.summonerList;
			$(view.components.summonerSelectList).html(defaultOption);
			var regionKey = storage.keys.regions; 
			storage.fn.get(regionKey, function(result) {
				var regions = result.regions;
				if (regions != undefined) {
					var storedRegion = regions[region];
					console.log(storedRegion);
					var isUndefined = typeof (storedRegion) === 'undefined';
					if (!isUndefined) {
						storedRegion.forEach(function(summoner) {
							storage.fn.loadSummoner(summoner, storedRegion.length);
						});
					}
				} else {
					storage.initRegions();
					storage.fn.loadSummoners(region);
				}
			});
		},

		loadSummoner: function(summoner, summonerCount) {
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
					storage.counters.loadingSummoners++;
					if (storage.counters.loadingSummoners >= summonerCount) {
						view.hideStatus();	
						storage.counters.loadingSummoners = 0;							
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
					view.displayAlert(summoner + ' is already stored in ' + region + ' list!');
				} else {
					regions[region][size] = summoner;
				  	var pair = utility.generateKeyValuePair(storage.keys.regions, regions);
				  	storage.fn.set(pair);
				  	storage.fn.loadSummoners(region);
				  	$(view.components.addSummonerField).val('');
				}
			});
		},

		removeSummoners: function(region, summoners) {
			storage.fn.get(storage.keys.regions, function(result) {
				var regions = result.regions;
				utility.arrayFuncs.removeCollection(regions[region], summoners);
			  	var pair = utility.generateKeyValuePair(storage.keys.regions, regions);
			  	storage.fn.set(pair, function() {
			  		storage.fn.load(region);
			  	});
			});
		}
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
		},

		deleteSummoner: function() {
			var selectedRegion = $(view.components.selectedRegion).text();		
			var selected = $('.edit-summoners input[type=checkbox]:checked');
			var summonersText = "";
			var alert = "";
			if (selected.length > 0) {
				storage.counters.removeSummoners.max = selected.length;
				var names = [];
				for (var i = 0; i < selected.length; i++) {
					var summoner = $(selected[i]).attr('name');
					summonersText += summoner;
					if (i != selected.length) summonersText += ', ';
					names[i] = summoner;
					var input = 'input[type=checkbox][name="'+summoner+'"]';
					$(input).parent().remove();
				}
				storage.fn.removeSummoners(selectedRegion, names);
				alert = summonersText + ' successfully removed from ' + selectedRegion + ' list!';
			} else {
				alert = 'No summoners selected to delete!';
			}
			view.displayAlert(alert);
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