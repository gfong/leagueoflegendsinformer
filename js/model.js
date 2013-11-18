/**
* League of Legends Informer Model
*/
var model = { };

/**
* League of Legends Summoner Stats Object
*/
model.summonerStats = {
  id: 0,
  name: "Name",
  lolKingLink: "Link",
  level: '?',
  normalWins: '?',
  rank: "Rank",
  rankedWins: '?',
  rankedLosses: '?',
  currentChampionStats: utility.objectBuilder(model.championStats),
  team: "Team",
  teamIndex: 0
};

/**
* League of Legends Champion Stats Object
*/
model.championStats = {
  id: 0,
  name: "Name",
  playedRank: "Played Rank",
  playedInRanked: undefined,
  games: '?',
  wins: '?',
  losses: '?',
  kda: utility.objectBuilder(model.kda),
  creepScore: '?'
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
	purpleTeam: utility.objectBuilder(model.team),
	blueTeam: utility.objectBuilder(model.team)
};

/**
* League of Legends Team
*/
model.team = [];

model.createServer = function (name) {
  var server = utility.objectBuilder(model.server);
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

model.champions = {
  'Annie':        1,
  'Olaf':         2,
  'Galio':        3,
  'Twisted Fate': 4,
  'Xin Zhao':     5,
  'Urgot':        6,
  'LeBlanc':      7,
  'Vladimir':     8,
  'Fiddlesticks': 9,
  'Kayle':        10,
  'Master Yi':    11,
  'Alistar':      12,
  'Ryze':         13,
  'Sion':         14,
  'Sivir':        15,
  'Soraka':       16,
  'Teemo':        17,
  'Tristana':     18,
  'Warwick':      19,
  'Nunu':         20,
  'Miss Fortune': 21,
  'Ashe':         22,
  'Tryndamere':   23,
  'Jax':          24,
  'Morgana':      25,
  'Zilean':       26,
  'Singed':       27,
  'Evelynn':      28,
  'Twitch':       29,
  'Karthus':      30,
  "Cho'Gath":     31,
  'Amumu':        32,
  'Rammus':       33,
  'Anivia':       34,
  'Shaco':        35,
  'Dr. Mundo':    36,
  'Sona':         37,
  'Kassadin':     38,
  'Irelia':       39,
  'Janna':        40,
  'Gangplank':    41,
  'Corki':        42,
  'Karma':        43,
  'Taric':        44,
  'Veigar':       45,
  'Caitlyn':      47,
  'Trundle':      48,
  'Swain':        50,
  'Blitzcrank':   53,
  'Malphite':     54,
  'Katarina':     55,
  'Nocturne':     56,
  'Maokai':       57,
  'Renekton':     58,
  'Jarvan IV':    59,
  'Elise':        60,
  'Orianna':      61,
  'Wukong':       62,
  'Brand':        63,
  'Lee Sin':      64,
  'Vayne':        67,
  'Rumble':       68,
  'Cassiopeia':   69,
  'Skarner':      72,
  'Heimerdinger': 74,
  'Nasus':        75,
  'Nidalee':      76,
  'Udyr':         77,
  'Poppy':        78,
  'Gragas':       79,
  'Pantheon':     80,
  'Ezreal':       81,
  'Mordekaiser':  82,
  'Yorick':       83,
  'Akali':        84,
  'Kennen':       85,
  'Garen':        86,
  'Leona':        89,
  'Malzahar':     90,
  'Talon':        91,
  'Riven':        92,
  "Kog'Maw":      96,
  'Shen':         98,
  'Lux':          99,
  'Xerath':       101,
  'Shyvana':      102,
  'Ahri':         103,
  'Graves':       104,
  'Fizz':         105,
  'Volibear':     106,
  'Rengar':       107,
  'Varus':        110,
  'Nautilus':     111,
  'Viktor':       112,
  'Sejuani':      113,
  'Fiora':        114,
  'Ziggs':        115,
  'Lulu':         117,
  'Draven':       119,
  'Hecarim':      120,
  "Kha'Zix":      121,
  'Darius':       122,
  'Jayce':        126,
  'Lissandra':    127,
  'Diana':        131,
  'Quinn':        133,
  'Syndra':       134,
  'Zyra':         143,
  'Zac':          154,
  'Jinx':         222,
  'Lucian':       236,
  'Zed':          238,
  'Vi':           254,
  'Aatrox':       266,
  'Nami':         267,
  'Thresh':       412
}

model.rankDivisions = ['I', 'II', 'III', 'IV', 'V'];