var externals = { };

externals.lolKing = { };
externals.lolKing.url = 'http://www.lolking.net/';
externals.lolKing.queries = { };
externals.lolKing.queries.summonerSearch = 'search?name=';
externals.lolKing.queries.summonerExists = '.search_result_item>div>div:nth-child(1)';

externals.elophant = { };
externals.elophant.url = 'http://www.elophant.com/';

externals.lolNexus = { };
externals.lolNexus.url = 'http://www.lolnexus.com/';
externals.lolNexus.queries = { };
externals.lolNexus.queries.notInGame = '.error';
externals.lolNexus.queries.map = '.j-noxia-search .header-bar h2';
externals.lolNexus.queries.blueTeam = '.team-1 table tbody';

externals.lolTeam = { };
externals.lolTeam.url = 'http://www.lolteam.net/';
externals.lolTeam.queries = { };
externals.lolTeam.queries.notInGame = '.alert-error:first-child';
externals.lolTeam.queries.allSummonerNames = '.player-card-title>a';
externals.lolTeam.queries.allSummonerRanks = '.player-card-rating-container>img';
externals.lolTeam.queries.allSummonerChampData = '.player-card-champion-text';
externals.lolTeam.queries.champName = '.bold-text';
externals.lolTeam.queries.champKDA = 'b';
externals.lolTeam.queries.champGames = 'b:nth-child(4)';

externals.load = function() {
	externals.loadRegions();
};

externals.loadRegions = function() {

};

/**
* Checks if a summoner exists for a region.
* Success callback: (region, summoner)
* Failure callback: (region, summoner)
*/
externals.lolKing.checkIfSummonerExists = function(region, summoner, successCB, failCB) {
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
		for (var i = 0; !foundSummoner && i < result.length; i++) {
			if (result[i].innerHTML === regionName) {
				foundSummoner = true;
			}
		}
		view.hideStatus();
		if (foundSummoner) {
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
};

externals.lolNexus.getSummonerGame = function(region, summoner, successCB, failCB) {
	var editedName = summoner.split(' ').join('+');
	var request = externals.lolNexus.url + region + '/search?name=' + editedName;
	var statusMsg = 'Requesting data from ' + request + '...';
	view.displayStatus(statusMsg);
	$.get(request, function(data, status) {
		view.hideStatus();
		if (status === 'OK') {
			externals.lolNexus.isSummonerInGame(summoner, data, successCB, failCB);
		} else {
			view.displayAlert('An error occurred while retrieving from ' + request + '.');
		}
	});
};

externals.lolNexus.isSummonerInGame = function(summoner, gameData, success, fail) {
	var queries = externals.lolNexus.queries;
	if ($(gameData).find(queries.notInGame) === null) {
		view.displayAlert(summoner + ' is currently not in a game!');
	} else {
		var mapData = $(gameData).find(queries.map);
		logKeyValues('mapData', mapData);
		view.generateHtmlForMap(mapData);
		var blueTeam = $(gameData).find(queries.blueTeam);
		logKeyValues('blueTeam', blueTeam);

		var purpleTeam = $(gameData).find(queries.purpleTeam);
	}
};

externals.lolTeam.getSummonerGame = function(region, summoner) {	
	var editedName = summoner.split(' ').join('%20');
	var lolTeamScope = externals.lolTeam;
	var request = lolTeamScope.url + region + '/' + editedName;
	var statusMsg = 'Requesting data from ' + request + '...';	
	view.displayStatus(statusMsg);
	$.get(request, function(data, status) {
		view.hideStatus();
		if (status === 'success') {
			lolTeamScope.isSummonerInGame(summoner, data);
		} else {
			view.displayAlert('An error occurred while retrieving from ' + request + '.');
		}
	});
}

externals.lolTeam.doesGameExist = function(data) {
	return data != undefined && data[0] != undefined && data[0].innerHTML != undefined;
}

externals.lolTeam.isSummonerInGame = function(summoner, gameData) {
	var queries = externals.lolTeam.queries;
	var scraped = $(gameData);
	var inGameResult = scraped.find(queries.notInGame);
	if (externals.lolTeam.doesGameExist(inGameResult)) {
		view.displayAlert(summoner + ' is currently not in a game!');
	} else {
		var summonerNames = scraped.find(queries.allSummonerNames);
		var ranks = scraped.find(queries.allSummonerRanks);
		var champData = scraped.find(queries.allSummonerChampData);
		var blueTeam = [];
		var purpleTeam = [];
		for (var i = 0; i < summonerNames.length; i++) {
			if (i % 2 == 0) {
				blueTeam[i / 2] = objectBuilder(model.summonerStats);
				var summonerStats = blueTeam[i / 2];
				externals.lolTeam.generateSummonerFromData(summonerStats, summonerNames[i], ranks[i], champData[i]);
			} else {
				purpleTeam[(i + 1) / 2] = objectBuilder(model.summonerStats);	
				var summonerStats = purpleTeam[(i + 1) / 2];
				externals.lolTeam.generateSummonerFromData(summonerStats, summonerNames[i], ranks[i], champData[i]);
			}
		}
		view.generateHtmlForTeam('blue-team', blueTeam);
		view.generateHtmlForTeam('purple-team', purpleTeam);
	}
}

externals.lolTeam.generateSummonerFromData = function(summonerObj, name, rankData, champData) {
	var queries = externals.lolTeam.queries;
	var data = $(champData);

	summonerObj.name = name;

	var rankImage = $(rankData)[0];
	var rankImageSrc = $(rankImage).attr('src');
	var rankLeague = rankImageSrc.substring(39, rankImageSrc.length - 6);
	var rankDivision = rankImageSrc.substring(rankImageSrc.length - 5, rankImageSrc.length - 4);
	var divionsConverted = model.rankDivisions[rankDivision - 1];
	
	summonerObj.rank = rankLeague + ' ' + divionsConverted;

	var champName = $(data.find(queries.champName))[0].innerHTML;
	var champKDA = objectBuilder(model.kda);
	var champGames = $(data.find(queries.champGames)).innerHTML;
	
	var queriedKDA = $(data.find(queries.champKDA));
	if (queriedKDA.length > 0) {
		champKDA.kills = queriedKDA[0].innerHTML;
		champKDA.deaths = queriedKDA[1].innerHTML;
		champKDA.assists = queriedKDA[2].innerHTML;
	}

	summonerObj.currentChampionStats = objectBuilder(model.championStats);
	summonerObj.currentChampionStats.id = model.champions[champName];
	summonerObj.currentChampionStats.name = champName;
	summonerObj.currentChampionStats.kda = champKDA;
	summonerObj.currentChampionStats.games = champGames;
}