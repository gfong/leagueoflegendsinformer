var externals = { };

externals.elophantURL = 'http://www.elophant.com/';
externals.lolnexusURL = 'http://www.lolnexus.com/';
externals.lolkingURL = 'http://www.lolking.net/';

externals.load = function() {
	externals.elophantPage = $.get(externals.elophantURL);
	externals.lolnexusPage = $.get(externals.lolnexusURL);

	externals.loadRegions();
};

externals.loadRegions = function() {

};

externals.checkIfSummonerExists = function(region, summoner) {
	var editedName = summoner.split(' ').join('+');
	// console.log("edited name: " + editedName);
	var searchURL = externals.lolkingURL + 'search?name=' + editedName;
	// console.log(searchURL);
	$.get(searchURL, function(data, status) {
		var lolkingSearchResults = data;
		// console.log("lolkingResults: " + lolkingSearchResults.toString());
		var regionName = universe.servers[region].name;
		// console.log("regionName: " + regionName);
		var resultDivs = $(lolkingSearchResults).find('.search_result_item>div>div:nth-child(1)');
		var foundSummoner = false;
		for (var i = 0; !foundSummoner && i < resultDivs.length; i++) {
			if (resultDivs[i].innerHTML === regionName) {
				foundSummoner = true;
			}
		}
		if (foundSummoner) {
			storage.storeSummoner(region, summoner);
			alert(summoner + ' has been successfully added to ' + regionName + ' list!');
		} else {
			alert('Cannot find summoner ' + summoner + ' in ' + regionName + '!');
		}
	});
};