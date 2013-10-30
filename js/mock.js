/**
* Mock data and generation.
* Requires jQuery, model.js
*/

var mock = { };

mock.blueTeam = [];
mock.purpleTeam = [];

mock.load = function() {
	mock.setupBlueTeam();
	mock.setupPurpleTeam();
};

mock.setupBlueTeam = function() {
	var kda = model.generateKDA(1, 1, 1);
	var garen = model.generateChampionStats(86, 'Garen', 1, 1, 1, kda, 1);
	var kat = model.generateChampionStats(55, 'Katarina', 1, 1, 1, kda, 1);
	var missfortune = model.generateChampionStats(21, 'Miss Fortune', 1, 1, 1, kda, 1);
	var darius = model.generateChampionStats(122, 'Darius', 1, 1, 1, kda, 1);
	var annie = model.generateChampionStats(1, 'Annie', 1, 1, 1, kda, 1);

	var summoner1 = model.generateSummonerStats('Soul of Ryuk', 30, 1, 'Gold I', 1, 1, garen);
	var summoner2 = model.generateSummonerStats('TheMountainsBane', 30, 1, 'Unranked', 1, 1, kat);
	var summoner3 = model.generateSummonerStats('Soul of Ryuk', 30, 1, 'Gold I', 1, 1, missfortune);
	var summoner4 = model.generateSummonerStats('Soul of Ryuk', 30, 1, 'Platinum V', 1, 1, darius);
	var summoner5 = model.generateSummonerStats('Soul of Ryuk', 30, 1, 'Challenger', 1, 1, annie);
	mock.blueTeam[0] = summoner1;
	mock.blueTeam[1] = summoner2;
	mock.blueTeam[2] = summoner3;
	mock.blueTeam[3] = summoner4;
	mock.blueTeam[4] = summoner5;
};

mock.setupPurpleTeam = function() {
	var kda = model.generateKDA(1, 1, 1);
	var garen = model.generateChampionStats(86, 'Garen', 1000, 1000, 1000, kda, 1000);
	var kat = model.generateChampionStats(55, 'Katarina', 1, 1, 1, kda, 1);
	var missfortune = model.generateChampionStats(21, 'Miss Fortune', 1, 1, 1, kda, 1);
	var darius = model.generateChampionStats(122, 'Darius', 1, 1, 1, kda, 1);
	var annie = model.generateChampionStats(1, 'Annie', 1, 1, 1, kda, 1);

	var summoner1 = model.generateSummonerStats('Soul of Ryuk', 30, 1, 'Gold I', 1, 1, garen);
	var summoner2 = model.generateSummonerStats('TheMountainsBane', 30, 1000, 'Unranked', 1000, 1000, kat);
	var summoner3 = model.generateSummonerStats('Soul of Ryuk', 30, 1, 'Gold I', 1, 1, missfortune);
	var summoner4 = model.generateSummonerStats('Soul of Ryuk', 30, 1, 'Platinum V', 1, 1, darius);
	var summoner5 = model.generateSummonerStats('Soul of Ryuk', 30, 1, 'Challenger', 1, 1, annie);
	mock.purpleTeam[0] = summoner1;
	mock.purpleTeam[1] = summoner2;
	mock.purpleTeam[2] = summoner3;
	mock.purpleTeam[3] = summoner4;
	mock.purpleTeam[4] = summoner5;
};
