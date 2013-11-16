/**
* Functions for manipulating data from lolteam.net
*/
externals.lolTeam.fn = {

	getSummonerGame: function(region, summoner) {	
		var functions = externals.lolTeam.fn;
		functions.isSummonerInGame(region, 
			summoner, 
			functions.requestSummonerGame,
			function(requestUrl) {
				view.hideStatus();
				view.displayAlert('An error occurred while retrieving from ' + requestUrl + '.');
			}
		)
	},

	doesGameExist: function(data) {
		var result = data.find(externals.lolTeam.queries.notInGame);
		return result == undefined || result[0] == undefined || result[0].innerHTML == undefined;
	},

	isSummonerInGame: function(region, summoner, success, fail) {
		var editedName = summoner.split(' ').join('%20');
		var lolTeamScope = externals.lolTeam;
		var requestUrl = lolTeamScope.url + region + '/' + editedName;

		var request = $.ajax({
			url: requestUrl,
			type: "GET",
		}).done(function(data) {
			success(summoner, data);
		}).fail(function(jqXHR, textStatus) {
			fail(requestUrl);
		});
	},

	requestSummonerGame: function(summoner, gameData) {
		var queries = externals.lolTeam.queries;
		var scraped = $(gameData);
		if (!externals.lolTeam.fn.doesGameExist(scraped)) {
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
		teamArray[teamData.index] = utility.objectBuilder(model.summonerStats);
		var summonerStats = teamArray[teamData.index];
		summonerStats.team = teamData.color;
		summonerStats.teamIndex = teamData.index;

		var queries = externals.lolTeam.queries;
		var data = $(champData);

		summonerStats.lolKingLink = name;
		summonerStats.name = $(name).text();
		summonerStats.id = $(name).attr('href').match(/\d+/)[0];
		
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
		var champGames = $(data.find(queries.champGames)).innerHTML;
		
		summonerStats.currentChampionStats = utility.objectBuilder(model.championStats);
		champStats = summonerStats.currentChampionStats;

		if(data === null || data[0] === undefined) {
			champStats.playedInRanked = 'Never Played In Ranked';
		} else {
			var playedInRankedMatch = data[0].innerHTML.match(queries.champPlayedRankRegex);
			if (playedInRankedMatch === null) {
				champStats.playedInRanked = 'Never Played In Ranked';
			} else {
				var champPlayedRank = playedInRankedMatch[0];
				var champKDA = utility.objectBuilder(model.kda);
				var queriedKDA = $(data.find(queries.champKDA));
				if (queriedKDA.length > 0) {
					champKDA.kills = queriedKDA[0].innerHTML;
					champKDA.deaths = queriedKDA[1].innerHTML;
					champKDA.assists = queriedKDA[2].innerHTML;
				}		
				champStats.kda = champKDA;
				champStats.playedRank = champPlayedRank;
			}
		}

		champStats.id = model.champions[champName];
		champStats.name = champName;
		champStats.games = champGames;
	},
};