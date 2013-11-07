/**
* Functions for manipulating data from LolCounter.com
*/
externals.lolcounter.fn = {

	getChampStrongInfo: function(champion, team) {
		var scope = externals.lolcounter;
		var queries = scope.queries;
		var request = scope.url + queries.getChampCounters + champion.replace(' ','');
		$.get(request, function(data) {
			for(key in regexFuncs) {
				data = regexFuncs[key](data);
			}
			var queryable = $(data);
			scope.fn.checkAllStrongs(queryable, team);
		});
	},

	getChampCounterInfo: function(champion, team) {
		var scope = externals.lolcounter;
		var queries = scope.queries;
		var request = scope.url + queries.getChampCounters + champion.replace(' ','');
		$.get(request, function(data) {
			for(key in regexFuncs) {
				data = regexFuncs[key](data);
			}
			var queryable = $(data);
			scope.fn.checkAllCounters(queryable, team);
		});
	},

	checkAllStrongs: function(queryable, team) {
		var scope = externals.lolcounter;
		var queries = scope.queries;
		var goodCounters = queryable.find(queries.getAllStrongs);
		for (var i = 0; i < goodCounters.length; i++) {
			scope.fn.processStrongChamp(goodCounters[i], team);
		}
	},

	checkAllCounters: function(queryable, team) {
		var scope = externals.lolcounter;
		var queries = scope.queries;
		var badCounters = queryable.find(queries.getAllCounters);
		for (var i = 0; i < badCounters.length; i++) {
			scope.fn.processCounterChamp(badCounters[i], team);
		}
	},

	processCounterChamp: function(counterObj, team) {
		var scope = externals.lolcounter;
		var queries = scope.queries;
		var counterChampHTML = counterObj.innerHTML;
		var substringized = counterChampHTML.substring(20,48);
		var champName = substringized.match(queries.getChampName)[0];
		var barPercentContainer = $(counterObj).find(queries.getBarPercent)[0];
		var percentAgainst = $(barPercentContainer).css('width').substring(0, 5);
		var percent = (100 - percentAgainst).toFixed(2);
		var enemyChamps = $('.' + team + ' .icon');
		var found = false;
		for (var i = 0; !found && i < enemyChamps.length; i++) {
			if(enemyChamps[i].alt === champName) {
				found = true;
				var overlay = $(enemyChamps[i]).parent().find('.icon-overlay')[0];
				if(!$(overlay).hasClass('active')) {
					$(overlay).addClass('active');
					$(overlay).html(percent + '%');
					var red = ((100 - percent) / 100 * 255).toFixed(0);
					var green = (percent / 100 * 255).toFixed(0);
					var color = 'rgba(' + red + ', ' + green + ',0,0.75)';
					$(overlay).css('background-color', color);
				}
			}
		}
	},

	processStrongChamp: function(counterObj, team) {
		var scope = externals.lolcounter;
		var queries = scope.queries;
		var counterChampHTML = counterObj.innerHTML;
		var substringized = counterChampHTML.substring(20,48);
		var champName = substringized.match(queries.getChampName)[0];
		var barPercentContainer = $(counterObj).find(queries.getBarPercent)[0];
		var percent = $(barPercentContainer).css('width').substring(0, 5).replace('%','');
		var enemyChamps = $('.' + team + ' .icon');
		var found = false;
		for (var i = 0; !found && i < enemyChamps.length; i++) {
			if(enemyChamps[i].alt === champName) {
				found = true;
				var overlay = $(enemyChamps[i]).parent().find('.icon-overlay')[0];
				if(!$(overlay).hasClass('active')) {
					$(overlay).addClass('active');
					$(overlay).html(percent + '%');
					var red = ((100 - percent) / 100 * 255).toFixed(0);
					var green = (percent / 100 * 255).toFixed(0);
					var color = 'rgba(' + red + ', ' + green + ',0,0.75)';
					$(overlay).css('background-color', color);
				}
			}
		}
	},

	getChampCounterInfoForTeam: function(champion, enemyTeam) {

	},

	getChampCounterInfoForChamp: function(champion, enemyChamp) {

	},

	initHandlers: function() {
		$('.icon-container').mouseenter(function() {
			var champ = $(this).find('.icon')[0].alt;
			var team = $(this).parent().parent().parent()[0].className;
			team = team === 'blue-team' ? 'purple-team' : 'blue-team';
			externals.lolcounter.fn.getChampCounterInfo(champ, team);
			externals.lolcounter.fn.getChampStrongInfo(champ, team);
		});

		$('.icon-container').mouseout(function() {
			$('.icon-overlay').html('');
			$('.icon-overlay').css('background','none');
			$('.icon-overlay').removeClass('active');
		});
	},

	init: function() {
		var scope = externals.lolcounter;
		scope.fn.initHandlers();
	}
}