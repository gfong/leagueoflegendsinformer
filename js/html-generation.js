/**
* Generates HTML for League of Legends Informer
*/

universe.generateHtmlForSummonerHeader = function(summoner) {
	var name = "<div class='summoner-name'>" + summoner.name + "</div>";
	var rank = "<div class='rank'>" + summoner.rank + "</div>";
	return "<header>" + name + rank + "</header>";
};

universe.generateHtmlForSummonerStats = function(summoner) {
	var level = "<div class='level'>LV" + summoner.level + "</div>";
	var normalWins = "<div class='wins'>" + summoner.normalWins + "</div>";

	var rankedWins = "<div class='wins'>" + summoner.rankedWins + "</div>";
	var rankedLosses = "<div class='losses'" + summoner.rankedLosses + "</div>";

	var rankedWinLossRatio = "<section class='ranked-win-loss-ratio'>" + rankedWins + "/" + rankedLosses + "</section>";
	return "<section class='summoner-stats'>" + level + normalWins + rankedWinLossRatio + "</section>";
};

universe.generateHtmlForSummonerChampionStatsHeader = function(summoner) {
	var championName = "<div class='champion-name'>" + summoner.currentChampionStats.name + "</div>";
	var buildsButton  = "<button>Builds</button>";
	return "<header>" + championName + buildsButton + "</header>";
};

universe.generateHtmlForSummonerChampionStatsContent = function(summoner) {
	var stats = summoner.currentChampionStats;
	var playedRank = "<div class='played-rank'>" + stats.playedRank +"</div>";
	var rankedWins = "W" + stats.wins;
	var rankedLosses = "L" + stats.losses;
	var rankedWinLossRatio = "<div class='ranked-win-loss-ratio'>" + rankedWins + "/" + rankedLosses + "</div>";
	var kda = stats.kda;
	var kills = kda.kills;
	var deaths = kda.deaths;
	var assists = kda.assists;
	var kdaRatio = "<div class='kda-ratio'>" + kills + "/" + deaths + "/" + assists + "</div>";
	var creepScore = "<div class='creep-score'>" + stats.creepScore + "</div>";
	return "<section>" + playedRank + rankedWinLossRatio + kdaRatio + creepScore + "</section>";
};

universe.generateHtmlForSummonerChampionStats = function(summoner) {
	var championName = summoner.currentChampionStats.name;
	var championId = summoner.currentChampionStats.id;
	var icon = "<img src='images/champ-icons/" + championId + "_Web_0.jpg'" + " alt='" + championName + " icon' />";
	var header = universe.generateHtmlForSummonerChampionStatsHeader(summoner);
	var content = universe.generateHtmlForSummonerChampionStatsContent(summoner);
	return "<section class='champion-stats'>" + icon + header + content + "</section>"; 
};

universe.generateHtmlForSummoner = function(summoner) {
	var header = universe.generateHtmlForSummonerHeader(summoner);
	var summonerStats = universe.generateHtmlForSummonerStats(summoner);
	var championStats = universe.generateHtmlForSummonerChampionStats(summoner);
	return "<li>" + header + summonerStats + championStats + "</li>";
};

universe.generateHtmlForTeam = function(team) {
	var html = "";
	for (var i = 0 ; i < team.length; i++) {
		html += universe.generateHtmlForSummoner(team[i]);
	}
	return html;
};