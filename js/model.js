/**
* League of Legends Informer Model
*/
var model = { };

/**
* League of Legends Summoner Stats Object
*/
model.summonerStats = {
  name: "Name",
  level: 0,
  normalWins: 0,
  rank: "Rank",
  rankedWins: 0,
  rankedLosses: 0,
  currentChampionStats: objectBuilder(model.championStats)
};

/**
* League of Legends Champion Stats Object
*/
model.championStats = {
  id: 0,
  name: "Name",
  playedRank: "Played Rank",
  wins: 0,
  losses: 0,
  kda: objectBuilder(model.kda),
  creepScore: 0
};

/**
* League of Legends Kill Death Assist Ratio Object
*/
model.kda = {
  kills: 0,
  deaths: 0, 
  assists: 0
};

/**
* League of Legends Match
*/
model.match = {
	mapName: "Map Name", // Name of the Map (Summoner's Rift, Twisted Treeline, Howling Abyss)
	type: "Type", // Type of Game (Normal, VS AI, Custom)
	mode: "Mode", // Game Mode (Blind Pick, Draft, Solo Ranked, Team Ranked, ARAM)
	purpleTeam: objectBuilder(model.team),
	blueTeam: objectBuilder(model.team)
};

/**
* League of Legends Team
*/
model.team = [];

model.createServer = function (name) {
  var server = objectBuilder(model.server);
  server.name = name;
  return server;
};

/**
* League of Legends Servers
*/
model.servers = {
  "NA":model.createServer("North America"),
  "EUW":model.createServer("Europe West"),
  "EUNE":model.createServer("Europe Nordic & East"),
  "BR":model.createServer("Brazil"),
  "TR":model.createServer("Turkey"),
  "RU":model.createServer("Russia"),
  "LAN":model.createServer("Latin America North"),
  "LAS":model.createServer("Latin America South"),
  "OCE":model.createServer("Oceania")
};

model.serverAbbreviations = [
  "NA", "EUW", "EUNE", "BR", "TR", "RU", "LAN", "LAS", "OCE"
];

/**
* League of Legends Server
*/
model.server = {
  name: "Server Name"
};