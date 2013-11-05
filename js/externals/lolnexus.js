// externals.lolNexus.getSummonerGame = function(region, summoner, successCB, failCB) {
// 	var editedName = summoner.split(' ').join('+');
// 	var request = externals.lolNexus.url + region + '/search?name=' + editedName;
// 	var statusMsg = 'Requesting data from ' + request + '...';
// 	view.displayStatus(statusMsg);
// 	$.get(request, function(data, status) {
// 		view.hideStatus();
// 		if (status === 'success') {
// 			externals.lolNexus.isSummonerInGame(summoner, data, successCB, failCB);
// 		} else {
// 			view.displayAlert('An error occurred while retrieving from ' + request + '.');
// 		}
// 	});
// };

// externals.lolNexus.isSummonerInGame = function(summoner, gameData, success, fail) {
// 	var queries = externals.lolNexus.queries;
// 	if ($(gameData).find(queries.notInGame) === null) {
// 		view.displayAlert(summoner + ' is currently not in a game!');
// 	} else {		
// 		externals.lolNexus.removeUnusedData(0, gameData);
// 	}
// };

// externals.lolNexus.removeUnusedData = function(index, resultText) {
// 	if (index < externals.lolNexus.remove.files.length) {
// 		var root = externals.lolNexus.remove.location;
// 		var file = externals.lolNexus.remove.files[index];
// 		var path = root + file;
// 		$.get(path, function (text) {
// 			console.log(resultText.indexOf(text));
// 			resultText = resultText.replace(text, '');
// 			externals.lolNexus.removeUnusedData(index + 1, resultText);
// 		});
// 	} else {
// 		resultText = resultText.replace(externals.lolNexus.replaceScript, externals.lolNexus.actualScript);	
// 		var data = $(resultText);
// 		data.find('.ad-placement.ad-main-med-rec-footer.ad-main-med-rect-footer').remove();
// 		data.find('div.t-netbar.u-icon.u-icon-z').remove();
// 		data.find('.main.nav').remove();
// 		data.find('footer').remove();
// 		externals.lolNexus.continueSummonerGameProcess(data);
// 	}
// }

// externals.lolNexus.continueSummonerGameProcess = function(data) {
// 	console.log($('<div>').append(data.clone()).html());
// 	// $('.hidden').html($('<div>').append(data.clone()).html());
// 	// var mapData = $(gameData).find(queries.map);
// 	// logKeyValues('mapData', mapData);
// 	// view.generateHtmlForMap(mapData);
// 	// var blueTeam = $(gameData).find(queries.blueTeam);
// 	// logKeyValues('blueTeam', blueTeam);

// 	// var purpleTeam = $(gameData).find(queries.purpleTeam);
// }