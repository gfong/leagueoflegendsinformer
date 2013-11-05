externals.lolTeam.fn = {

	getSummonerGame: function(region, summoner) {	
		var editedName = summoner.split(' ').join('%20');
		var lolTeamScope = externals.lolTeam;
		var requestUrl = lolTeamScope.url + region + '/' + editedName;
		var statusMsg = externals.generateRequestMessage(requestUrl);
		view.displayStatus(statusMsg);

		var request = $.ajax({
			url: requestUrl,
			type: "GET"
		});
		 
		request.done(function(data) {
			externals.lolTeam.fn.isSummonerInGame(summoner, data);
		});
		 
		request.fail(function( jqXHR, textStatus ) {
			view.hideStatus();
			view.displayAlert('An error occurred while retrieving from ' + request + '.');
		});

		// $.get(request, function(data, status) {
		// 	if (status === 'success') {
		// 		externals.lolTeam.fn.isSummonerInGame(summoner, data);
		// 	} else {
		// 		view.hideStatus();
		// 		view.displayAlert('An error occurred while retrieving from ' + request + '.');
		// 	}
		// });
	},

	doesGameExist: function(data) {
		return data != undefined && data[0] != undefined && data[0].innerHTML != undefined;
	},

	isSummonerInGame: function(summoner, gameData) {
		var queries = externals.lolTeam.queries;
		var scraped = $(gameData);
		var inGameResult = scraped.find(queries.notInGame);
		if (externals.lolTeam.fn.doesGameExist(inGameResult)) {
			view.hideStatus();
			view.displayAlert(summoner + ' is currently not in a game!');
		} else {
			view.hideAlert();
			var summonerNames = scraped.find(queries.allSummonerNames);
			var ranks = scraped.find(queries.allSummonerRanks);
			var champData = scraped.find(queries.allSummonerChampData);
			var blueTeam = [];
			var purpleTeam = [];
			for (var i = 0; i < summonerNames.length; i++) {
				var teamData = {
					index: (i % 2 == 0) ? i / 2 : ((i + 1) / 2) - 1,
					color: (i % 2 == 0) ? 'blue-team' : 'purple-team'
				};
				var teamArray = (i % 2 == 0) ? blueTeam : purpleTeam;
				externals.lolTeam.fn.generateSummonerFromData(teamArray, teamData, summonerNames[i], ranks[i], champData[i]);
			}
			view.generateHtmlForMatch(blueTeam, purpleTeam);

			var lolkingGenerateSummoner = externals.lolKing.fn.generateSummoner;
			blueTeam.forEach(lolkingGenerateSummoner);
			purpleTeam.forEach(lolkingGenerateSummoner);
		}
	},

	generateSummonerFromData: function(teamArray, teamData, name, rankData, champData) {
		teamArray[teamData.index] = objectBuilder(model.summonerStats);
		var summonerStats = teamArray[teamData.index];
		summonerStats.team = teamData.color;
		summonerStats.teamIndex = teamData.index;

		var queries = externals.lolTeam.queries;
		var data = $(champData);

		summonerStats.lolKingLink = name;
		summonerStats.name = $(name).text();
		summonerStats.id = $(name).attr('href').substring(35);
		
		var rankImage = $(rankData)[0];
		var rankImageSrc = $(rankImage).attr('src');
		var rankLeague = rankImageSrc.substring(39, rankImageSrc.length - 6);
		var rankDivision = rankImageSrc.substring(rankImageSrc.length - 5, rankImageSrc.length - 4);
		if (rankDivision === 'd') {
			summonerStats.rank = 'Unranked';
		} else {
			var divionsConverted = model.rankDivisions[rankDivision - 1];
			summonerStats.rank = rankLeague + ' ' + divionsConverted;
		}
		

		var champName = $(data.find(queries.champName))[0].innerHTML;
		var champKDA = objectBuilder(model.kda);
		var champGames = $(data.find(queries.champGames)).innerHTML;
		
		var queriedKDA = $(data.find(queries.champKDA));
		if (queriedKDA.length > 0) {
			champKDA.kills = queriedKDA[0].innerHTML;
			champKDA.deaths = queriedKDA[1].innerHTML;
			champKDA.assists = queriedKDA[2].innerHTML;
		}

		summonerStats.currentChampionStats = objectBuilder(model.championStats);
		summonerStats.currentChampionStats.id = model.champions[champName];
		summonerStats.currentChampionStats.name = champName;
		summonerStats.currentChampionStats.kda = champKDA;
		summonerStats.currentChampionStats.games = champGames;
	},
};