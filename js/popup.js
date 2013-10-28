$(document).ready(function() {
	console.log('1');
	var kda = universe.generateKDA(1, 1, 1);
	console.log('2');

	// var blue = universe.objectBuilder(universe.team);
	var blue = [];
	console.log('3');
	var garen = universe.generateChampionStats(86, 'Garen', 1, 1, 1, kda, 1);
	var kat = universe.generateChampionStats(55, 'Katarina', 1, 1, 1, kda, 1);
	var missfortune = universe.generateChampionStats(21, 'Miss Fortune', 1, 1, 1, kda, 1);
	var darius = universe.generateChampionStats(122, 'Darius', 1, 1, 1, kda, 1);
	var annie = universe.generateChampionStats(1, 'Annie', 1, 1, 1, kda, 1);

	var summoner1 = universe.generateSummonerStats('Soul of Ryuk', 30, 1, 'Gold I', 1, 1, garen);
	var summoner2 = universe.generateSummonerStats('TheMountainsBane', 30, 1, 'Unranked', 1, 1, kat);
	var summoner3 = universe.generateSummonerStats('Soul of Ryuk', 30, 1, 'Gold I', 1, 1, missfortune);
	var summoner4 = universe.generateSummonerStats('Soul of Ryuk', 30, 1, 'Platinum V', 1, 1, darius);
	var summoner5 = universe.generateSummonerStats('Soul of Ryuk', 30, 1, 'Challenger', 1, 1, annie);
	blue[0] = summoner1;
	blue[1] = summoner2;
	blue[2] = summoner3;
	blue[3] = summoner4;
	blue[4] = summoner5;

	// var purple = universe.objectBuilder(universe.team);
	var purple = [];
	purple[0] = summoner1;
	purple[1] = summoner2;
	purple[2] = summoner3;
	purple[3] = summoner4;
	purple[4] = summoner5;

	var purpleHtml = universe.generateHtmlForTeam(purple);
	$(".purple-team").html(purpleHtml);

	var blueHtml = universe.generateHtmlForTeam(blue);
	$(".blue-team").html(blueHtml);
	console.log('here');
});