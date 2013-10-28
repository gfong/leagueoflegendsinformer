/**
* League of Legends Informer Universe
*/
var universe = { };

/**
* Object Builder for Prototyping
*/
universe.objectBuilder = function (proto_object) {
  var F = function(){};
  F.prototype = proto_object;
  return new F();
};


/**
* League of Legends Summoner Stats Object
*/
universe.summonerStats = {
  name: "Name",
  level: 0,
  normalWins: 0,
  rank: "Rank",
  rankedWins: 0,
  rankedLosses: 0,
  currentChampionStats: universe.objectBuilder(universe.championStats)
};

/**
* League of Legends Champion Stats Object
*/
universe.championStats = {
  id: 0,
  name: "Name",
  playedRank: "Played Rank",
  wins: 0,
  losses: 0,
  kda: universe.objectBuilder(universe.kda),
  creepScore: 0
};

/**
* League of Legends Kill Death Assist Ratio Object
*/
universe.kda = {
  kills: 0,
  deaths: 0, 
  assists: 0
};

/**
* League of Legends Match
*/
universe.match = {
	mapName: "Map Name", // Name of the Map (Summoner's Rift, Twisted Treeline, Howling Abyss)
	type: "Type", // Type of Game (Normal, VS AI, Custom)
	mode: "Mode", // Game Mode (Blind Pick, Draft, Solo Ranked, Team Ranked, ARAM)
	purpleTeam: universe.objectBuilder(universe.team),
	blueTeam: universe.objectBuilder(universe.team)
};

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