/**
* Generates a KDA object with the given kills, deaths, and assists.
*/
model.generateKDA = function(kills, deaths, assists) {
	var kda = objectBuilder(model.kda);
	kda.kills = kills;
	kda.deaths = deaths;
	kda.assists = assists;
	return kda;
};

/**
* Generates a ChampionStats object with no ranked stats.
*/
model.generateChampionStats = function(id, name) {
	var stats = objectBuilder(model.championStats);
	stats.id = id;
	stats.name = name;
	return stats;
};

/**
* Generates a ChampionStats object with ranked stats.
*/
model.generateChampionStats = function(id, name, playedRank, wins, losses, kda, creepScore) {
	var stats = objectBuilder(model.championStats);
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
model.generateSummonerStats = function(name, level, normalWins, rank, rankedWins, rankedLosses, championStats) {
	var stats = objectBuilder(model.summonerStats);
	stats.name = name;
	stats.level = level;
	stats.normalWins = normalWins;
	stats.rank = rank;
	stats.rankedWins = rankedWins;
	stats.rankedLosses = rankedLosses;
	stats.currentChampionStats = championStats;
	return stats;
};