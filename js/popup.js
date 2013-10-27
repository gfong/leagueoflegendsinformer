/**
* League of Legends Informer Universe
*/
var universe = { };

/**
* League of Legends Summoner
*/
universe.summoner = {
  	name: "Name",
  	level: 0,
  	normalWins: 0,
  	rank: "Rank",
  	rankedWins: 0,
  	rankedLosses: 0,
  	currentChampionStats: null
};

/**
* League of Legends Champion Stats Object
*/
universe.championStats = {
  	name: "Name",
  	playedRank: "Played Rank",
  	wins: 0,
  	losses: 0,
  	kills: 0,
  	deaths: 0,
  	assists: 0,
  	creepScore: 0
};

/**
* League of Legends Match
*/
universe.match = {
	mapName: "Map Name", // Name of the Map (Summoner's Rift, Twisted Treeline, Howling Abyss)
	type: "Type", // Type of Game (Normal, VS AI, Custom)
	mode: "Mode", // Game Mode (Blind Pick, Draft, Solo Ranked, Team Ranked, ARAM)
	purpleTeam: null,
	blueTeam: null
}

/**
* League of Legends Team
*/
universe.team = [];

/**
* League of Legends Servers
*/
universe.servers = [];

/**
* League of Legends Server
*/
universe.server = {
	name: "Server Name",
  	abbr: "Abbreviation",
  	savedSummoners: []
};

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

universe.generateHtmlForTeam = function() {

};

$(document).ready(function() {
	// $()
// http://www.lolnexus.com/NA/search?name=soul+of+ryuk&region=NA
};