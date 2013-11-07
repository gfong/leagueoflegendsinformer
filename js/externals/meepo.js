/**
* Functions for manipulating data from the meepo API
* (not used because not allowed to show API key on client side)
*/
externals.lolMeepo.generateSummonerChampionStats = function(summonerObj) {
	var region = $(view.components.selectedRegion).text().toLowerCase();
	var root = externals.lolMeepo.url;
	var summonerName = summonerObj.name;
	var season = 3;
	var request = root + 'player/' + region + '/' + summonerName + '/ranked_stats/season/' + season;
	var statusMsg = externals.generateRequestMessage(request);
	view.displayStatus(statusMsg);

	$.ajax({
	  url: request,
	  headers: externals.lolMeepo.headers
	}).done(function(data) {
	  	view.hideStatus();
	  	if (data.error_message != undefined) {
			view.displayAlert(data.error_message);
	  	} else {
	  		console.log(data);
	  		var level = data.player.level;
	  		var lifetimeStats = data.data.lifetimeStatistics;
	  		var callbacks = externals.lolMeepo.callbacks.slice(0);
	  		for (var j = 0; callbacks.length > 0 && j < lifetimeStats.array.length; j++) {
  				var stat = lifetimeStats.array[j];
  				if (stat.championId === summonerObj.currentChampionStats.id) {
  					var found = false;
  					for (var i = 0; !found && i < callbacks.length; i++) {
  						if (callbacks[i](stat, summonerObj.name)) {
  							found = true;
  							callbacks = callbacks.splice(i, 1);
  						}
  					}
  				}	
	  		}
	  	}
	});
};

externals.lolMeepo.generateTotalCS = function (stat, summonerName) {
	var found = false;
	if (stat.statType == externals.lolMeepo.statTypes.totalCS) {
		var creepScore = (stat.value / stat.count).toFixed(2);
		console.log(creepScore);
		view.generateHtmlForCreepScore(summonerName, creepScore);
		found = true;
	}
	return found;
}

externals.lolMeepo.callbacks = [
	externals.lolMeepo.generateTotalCS
];