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
}

universe.generateHtmlForSummonerChampionStatsContent = function(summoner) {
	var playedRank = "<div class='played-rank'>" + summoner.currentChampionStats.playedRank +"</div>";
	var rankedWins = "W" + summoner.currentChampionStats.wins;
	var rankedLosses = "L" + summoner.currentChampionStats.losses;
	var rankedWinLossRatio = "<div class='ranked-win-loss-ratio'>" + rankedWins + "/" + rankedLosses + "</div>";
	var kills = summoner.currentChampionStats.kills;
	var deaths = summoner.currentChampionStats.deaths;
	var assists = summoner.currentChampionStats.assists;
	var kdaRatio = "<div class='kda-ratio'>" + kills + "/" + deaths + "/" + assists + "</div>";
	var creepScore = "<div class='creep-score'" + summoner.currentChampionStats.creepScore + "</div>";
	return "<section>" + playedRank + rankedWinLossRatio + kdaRatio + creepScore + "</section>";
}

universe.generateHtmlForSummonerChampionStats = function(summoner) {
	var championName = summoner.currentChampionStats.name;
	var icon = "<img src='images/" + championName + "-icon.png'" + " alt='" + championName + "icon' />";
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