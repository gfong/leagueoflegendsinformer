/**
* Generates HTML for League of Legends Informer
*/

var view = { };

view.templates = { };
view.templates.summoner = 'templates/_summoner.html';

view.defaults = { };
view.defaults.summonerListOption = '<option value="">Select or Add a Summoner</option>';

view.components = { };
view.components.summonerSelectList = '.summoner-selection select';

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

view.generateHtmlForSummonerHeader = function(template, summoner) {
	view.setTemplateData(template, '.summoner-name', summoner.name);
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
	var rankedWinLossRatio = 'W' + stats.wins + '/' + 'L' + stats.losses;
	view.setTemplateData(template, '.ranked-win-loss-ratio', rankedWinLossRatio);
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
	for (var i = 0 ; i < team.length; i++) {
		var summoner = team[i];
		view.generateHtmlForSummoner(teamColor, summoner);
	}
};