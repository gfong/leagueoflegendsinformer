/**
* Generates HTML for League of Legends Informer
*/

var view = { };

view.templates = { };
view.templates.summoner = 'templates/_summoner.html';
view.templates.options = 'templates/_options.html';

view.defaults = { };
view.defaults.summonerListOption = '<option value="">Select or Add a Summoner</option>';

view.components = { };
view.components.selectedRegion = '.region-selection a.selected';
view.components.addSummonerButton = '.summoner-selection input[type=submit]';
view.components.summonerSelectList = '.summoner-selection select';
view.components.addSummonerField = '.summoner-selection input[type=text]';

view.components.mapInfo = '.map-information';
view.components.content = '.content';
view.components.alert = '.alert-message';
view.components.overlay = '.overlay';
view.components.status = '.status-message';

view.generateHtmlForLevel = function(summonerName, level) {
	var editedName = summonerName.split(' ').join('_');
	var query = '#' + editedName + ' .level';
	var result = $(query)[0];
	$(result).html(level);
};

view.generateHtmlForNormalWins = function(summonerName, wins) {
	var editedName = summonerName.split(' ').join('_');
	var query = '#' + editedName + ' .wins.normal';
	var result = $(query)[0];
	$(result).html('W' + wins);
};

view.generateHtmlForRankedWinsLosses = function(summonerName, wins, losses) {
	var editedName = summonerName.split(' ').join('_');
	var queryWins = '#' + editedName + ' .wins.ranked';
	var resultWins = $(queryWins)[0];
	$(resultWins).html('W' + wins);
	var queryLosses = '#' + editedName + ' .losses.ranked';
	var resultLosses = $(queryLosses)[0];
	$(resultLosses).html('L' + losses);
};

view.generateHtmlForChampWins = function(summonerName, wins) {
	var editedName = summonerName.split(' ').join('_');
	var query = '#' + editedName + ' .champion-stats .wins.ranked';
	var result = $(query)[0];
	$(result).html('W' + wins);
};

view.generateHtmlForChampLosses = function(summonerName, losses) {
	var editedName = summonerName.split(' ').join('_');
	var query = '#' + editedName + ' .champion-stats .losses.ranked';
	var result = $(query)[0];
	$(result).html('L' + losses);
};

view.generateHtmlForCreepScore = function(summonerName, creepScore) {
	var editedName = summonerName.split(' ').join('_');
	var query = '#' + editedName + ' .creep-score';
	var result = $(query)[0];
	$(result).html(creepScore + ' cs');
};

view.generateUnranked = function(summonerName) {
	var editedName = summonerName.split(' ').join('_');
	$('#' + editedName + ' .summoner-stats>.ranked-win-loss-ratio').html('');
}

view.generateNeverPlayedInRanked = function(summonerName) {
	var editedName = summonerName.split(' ').join('_');
	$('#' + editedName + ' .champion-stats>section').html('Never Played In Ranked');
}

view.loadTemplate = function(url, callback) {
	$.get(url, callback);
};

view.setTemplateData = function(template, styleClass, data) {
	$(template).find(styleClass).html(data);
};

/**
* Used for changing attributes of a class
*/
view.setTemplateAttribute = function(template, styleClass, attr, val) {
	$(template).find(styleClass).attr(attr, val);
}

view.setTemplateId = function(template, val) {
	var obj = $(template)[2];
	obj.id = val;
}

view.generateHtmlForSummonerHeader = function(template, summoner) {
	view.setTemplateId(template, summoner.name.split(' ').join('_'));
	view.setTemplateData(template, '.summoner-name', summoner.lolKingLink);
	view.setTemplateData(template, '.rank', summoner.rank);
};

view.generateHtmlForSummonerStats = function(template, summoner) {
	view.setTemplateData(template, '.level', 'LV' + summoner.level);
	view.setTemplateData(template, '.wins.normal', 'W' + summoner.normalWins);
	view.setTemplateData(template, '.wins.ranked', summoner.rankedWins);
	view.setTemplateData(template, '.wins.losses', summoner.rankedLosses);
};

view.generateHtmlForSummonerChampionStatsHeader = function(template, summoner) {
	var name = summoner.currentChampionStats.name;
	view.setTemplateData(template, '.champion-name', name);	
};

view.generateHtmlForSummonerChampionStatsContent = function(template, summoner) {
	var stats = summoner.currentChampionStats;
	view.setTemplateData(template, '.played-rank', stats.playedRank);
	var kda = stats.kda;
	var kdaText = kda.kills + '/' + kda.deaths + '/' + kda.assists;
	view.setTemplateData(template, '.kda-ratio', kdaText);
	view.setTemplateData(template, '.creep-score', stats.creepScore + ' cs');
};

view.generateHtmlForSummonerChampionStats = function(template, summoner) {
	var championName = summoner.currentChampionStats.name;
	var championId = summoner.currentChampionStats.id;
	var imagePath = 'images/champ-icons/' + championId + "_Web_0.jpg";
	var altText = championName + ' icon';
	view.setTemplateAttribute(template, '.icon', 'src', imagePath);
	view.setTemplateAttribute(template, '.icon', 'alt', altText);
	view.generateHtmlForSummonerChampionStatsHeader(template, summoner);
	view.generateHtmlForSummonerChampionStatsContent(template, summoner);
};

view.generateHtmlForSummoner = function(teamColor, summoner) {
	view.loadTemplate(view.templates.summoner, function(data, status) {
		var template = $(data);
		view.generateHtmlForSummonerHeader(template, summoner);
		view.generateHtmlForSummonerStats(template, summoner);
		view.generateHtmlForSummonerChampionStats(template, summoner);
		$('.' + teamColor).append(template);
	});
};

view.generateHtmlForTeam = function(teamColor, team) {
	$('.' + teamColor).html('');
	for (var i = 0 ; i < team.length; i++) {
		var summoner = team[i];
		view.generateHtmlForSummoner(teamColor, summoner);
	}
};

view.generateHtmlForMatch = function(blueTeam, purpleTeam) {
	$(view.components.content).html('');
	$(view.components.content).append('<ul class="blue-team"></ul>');
	$(view.components.content).append('<ul class="purple-team"></ul>');
	view.generateHtmlForTeam('blue-team', blueTeam);
	view.generateHtmlForTeam('purple-team', purpleTeam);
}

view.generateHtmlForMap = function(mapData) {
	// mapData.split(',');
}

view.generateHtmlForOptions = function(callback) {
	view.loadTemplate(view.templates.options, function(data, success) {
		$(view.components.content).html(data);
		callback();
	});
};

view.generateHtmlForOption = function(option) {
	var html = '<button id=' + option.id + '>' + option.text + '</button>';
	$('#main-options').append(html);	
	$('#' + option.id).click(function() {
		option.callback(option);
	});
};

view.displayAlert = function(message) {
	$(view.components.alert).html(message);
	$(view.components.alert).fadeIn('fast');
}

view.hideAlert = function() {
	$(view.components.alert).fadeOut('fast');
}

view.handlers = { };

view.handlers.alertClick = function() {
	$(view.components.alert).fadeOut('fast');
};

view.displayStatus = function(message) {
	$(view.components.status).html(message);
	$(view.components.overlay).fadeIn('fast');
}

view.hideStatus = function() {
	$(view.components.overlay).fadeOut('fast');
}