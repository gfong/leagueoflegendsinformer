/**
* Generates a KDA object with the given kills, deaths, and assists.
*/
universe.generateKDA = function(kills, deaths, assists) {
	var kda = universe.objectBuilder(universe.kda);
	kda.kills = kills;
	kda.deaths = deaths;
	kda.assists = assists;
	return kda;
};

/**
* Generates a ChampionStats object with no ranked stats.
*/
universe.generateChampionStats = function(id, name) {
	var stats = universe.objectBuilder(universe.championStats);
	stats.id = id;
	stats.name = name;
	return stats;
};

/**
* Generates a ChampionStats object with ranked stats.
*/
universe.generateChampionStats = function(id, name, playedRank, wins, losses, kda, creepScore) {
	var stats = universe.objectBuilder(universe.championStats);
	stats.id = id;
	stats.name = name;
	stats.playedRank = playedRank;
	stats.wins = wins;
	stats.losses = losses;
	stats.kda = kda;
	stats.creepScore = creepScore;
	return stats;
};

/**
* Generates a SummonerStats object.
*/
universe.generateSummonerStats = function(name, level, normalWins, rank, rankedWins, rankedLosses, championStats) {
	var stats = universe.objectBuilder(universe.summonerStats);
	stats.name = name;
	stats.level = level;
	stats.normalWins = normalWins;
	stats.rank = rank;
	stats.rankedWins = rankedWins;
	stats.rankedLosses = rankedLosses;
	stats.currentChampionStats = championStats;
	return stats;
};