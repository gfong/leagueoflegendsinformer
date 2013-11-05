/**
* Functions for manipulating the external resource lolking.
*/
externals.lolKing.fn = {

	/**
	* Checks if a summoner exists for a region.
	* Success callback: (region, summoner)
	* Failure callback: (region, summoner)
	*/
	checkIfSummonerExists: function(region, summoner, successCB, failCB) {
		var editedName = summoner.split(' ').join('+');
		var siteUrl = externals.lolKing.url;
		var search = siteUrl + externals.lolKing.queries.summonerSearch + editedName;
		var statusMsg = 'Checking if ' + summoner + ' exists in ' + region + '...';
		view.displayStatus(statusMsg);
		$.get(search, function(data, status) {
			var regionName = model.servers[region].name;
			var query = externals.lolKing.queries.summonerExists;
			var result = $(data).find(query);
			var foundSummoner = false;
			var correctResult = {};
			for (var i = 0; !foundSummoner && i < result.length; i++) {
				if (result[i].innerHTML === regionName) {
					foundSummoner = true;
					correctResult = $(result[i]).parent();
				}
			}
			view.hideStatus();
			if (foundSummoner) {
				var nameQuery = externals.lolKing.queries.summonerName;
				summoner = $(correctResult).find(nameQuery)[0].innerHTML;
				successCB(region, summoner);
				var successMsg = summoner + ' has been successfully added to ' + regionName + ' list!';
				view.displayAlert(successMsg);
			} else {
				if (failCB != undefined) {
					failCB(region, summoner);
				}
				view.displayAlert('Cannot find summoner ' + summoner + ' in ' + regionName + '!');
			}
		});
	},

	buildRequest: function(summoner) {
		var region = $(view.components.selectedRegion).text().toLowerCase();
		var root = externals.lolKing.url;
		var action = externals.lolKing.queries.summonerStats;
		return root + action + region + '/' + summoner.id;
	},

	generateSummoner: function(summoner) {
		var request = externals.lolKing.fn.buildRequest(summoner);
		var statusMsg = externals.generateRequestMessage(request);
		view.displayStatus(statusMsg);

		$.get(request, function(data, status) {
		  	if (status === 'success') {
		  		externals.lolKing.fn.generateSummonerSuccess(summoner, data);
		  	} else {
		  		view.hideStatus();
				view.displayAlert('Failed to request data from ' + request + '!');
		  	}
		});
	},

	generateSummonerSuccess: function(summoner, data) {
		var scope = externals.lolKing.fn;
		var queries = externals.lolKing.queries;
		data = externals.lolKing.fn.removeDataTags(data);
		data = externals.lolKing.fn.removeDataImages(data);

		var queryable = $(data);
		
		scope.generateSummonerLevel(summoner, queryable);

		var normalWins = queryable.find(queries.normalWins)[0].innerHTML;
		view.generateHtmlForNormalWins(summoner.name, normalWins);


		var rankedStats = queryable.find(queries.rankedWinsLosses);
		if (rankedStats[4] != undefined) {
			var rankedWins = $(rankedStats[4]).find('span')[0].innerHTML;
			var rankedLosses = $(rankedStats[5]).find('span')[0].innerHTML;
			view.generateHtmlForRankedWinsLosses(summoner.name, rankedWins, rankedLosses);
		} else {
			view.generateHtmlForUnranked(summoner.name);
		}

		var champQuery = queries.champStats + '[data-sortval="' + summoner.currentChampionStats.name + '"]';

		if(queryable.find(champQuery).length > 0) {
			var champQueryable = queryable.find(champQuery).parent();
			scope.generateChampWins(summoner, champQueryable);
			scope.generateChampLosses(summoner, champQueryable);
			scope.generateChampCS(summoner, champQueryable);
		} else {
			view.generateNeverPlayedInRanked(summoner.name);
		}


		externals.lolKing.loadCount++;
		if (externals.lolKing.loadCount > 9) {
			view.hideStatus();
			loadCount = 0;
		}
	},

	generateSummonerLevel: function(summoner, queryable) {
		var levelQuery = externals.lolKing.queries.summonerLevel;
		var queried = queryable.find(levelQuery);
		var html = queried.html();
		var summonerLevel = html.match(/Level.[\D\S]*?\d*/g);
		view.generateHtmlForLevel(summoner.name, summonerLevel);
	},

	generateChampWins: function(summoner, champQueryable) {
		var result = champQueryable.find('td:nth-child(2)').html();
		view.generateHtmlForChampWins(summoner.name, result);
	},

	generateChampLosses: function(summoner, champQueryable) {
		var result = champQueryable.find('td:nth-child(3)').html();
		view.generateHtmlForChampLosses(summoner.name, result);
	},

	generateChampCS: function(summoner, champQueryable) {
		var result = champQueryable.find('td:nth-child(9)').html();
		result = result.substring(0, result.length-5);
		view.generateHtmlForCreepScore(summoner.name, result);
	},

	removeDataTags: function(data) {
		data = data.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
		// data = data.replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, '');
		// data = data.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
		data = data.replace(/<img\b.*?>/gi, '');		
		// data = data.replace(/<link\b[^<]*(?:(?!\/>)<[^<]*)*\/>/gi, '');	
		// data = data.replace(/background:.*?[^&quot;];/gi, '');
		// data = data.replace(/src=".*?"/gi, '');
		return data;
	},

	removeDataImages: function(data) {
		externals.lolKing.remove.images.forEach(function(url) {
			data = data.replace(url, '');
		})
		return data;
	},

	getCreepScore: function() {

	}
};