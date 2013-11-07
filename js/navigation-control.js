/**
* Controls the navigation for menus
*/

var navigation = {

	fn: { 
		generateMainOption: function(option) {
			view.generateHtmlForOption(option);
		}
	},

	callbacks: {
		editSummoners: function(option) {
			view.loadTemplate(option.template, function(data) {
				var checkBoxes = [];
				var selectedRegion = $(view.components.selectedRegion).text();
				var checkBoxOpen = "<div><input type=checkbox ";
				storage.fn.getSummoners(selectedRegion, function(summoners) {
					for (var i = 0; i < summoners.length; i++) {
						var name = summoners[i];
						checkBoxes[i] = checkBoxOpen + 'name="' + name + '"" value="' + name +'"">' + name + '</input></div>';
					}
					for (var key in checkBoxes) {
						data = $(data).prepend(checkBoxes[key]);
					}
					$(view.components.content).html(data);
					$('.edit-summoners .delete-button').click(function() {
						var selected = $('.edit-summoners input[type=checkbox]:checked');
						var summonersText = "";
						for (var i = 0; i < selected.length; i++) {
							var summoner = $(selected[i]).attr('name');
							summonersText += summoner + ' ';
							var input = 'input[type=checkbox][name="'+summoner+'"]';
							$(input).parent().remove();
							storage.fn.removeSummoner(selectedRegion, summoner);
						}
						var successMsg = summonersText + ' successfully removed from ' + selectedRegion + ' list!';
						view.displayAlert(successMsg);
					});
				});
			});
		},

		customizeMatchDetails: function(option) {

		},

		customizeBuilds: function(option) {

		},
		
		viewSummonerInfo: function(option) {

		},
		viewChampionInfo: function(option) {

		},
		help: function() {

		}
	},
};

navigation.main = [
	{
		id: 'edit-summoners',
		text: 'Edit Summoner List',
		callback: navigation.callbacks.editSummoners,
		template: 'templates/_editSummoners.html'
	},
	{
		id: 'customize-match',
		text: 'Customize Match Details',
		callback: navigation.callbacks.customizeMatchDetails,
		template: 'templates/_customizeMatchDetails.html'
	},
	{
		id: 'customize-builds',
		text: 'Customize Builds',
		callback: navigation.callbacks.customizeBuilds,
		template: 'templates/_customizeBuilds.html'
	},
	{
		id: 'view-summoner',
		text: 'View Summoner Info',
		callback: navigation.callbacks.viewSummonerInfo,
		template: 'templates/_viewSummonerInfo.html'
	},
	{
		id: 'view-champion',
		text: 'View Champion Info',
		callback: navigation.callbacks.viewChampionInfo,
		template: 'templates/_customizeBuilds.html'
	},
	{
		id: 'help',
		text: 'Help',
		callback: navigation.callbacks.help,
		template: 'help.html'
	},
]

navigation.fn.generateMain = function() {
	view.generateHtmlForOptions(function() {
		navigation.main.forEach(navigation.fn.generateMainOption);
	});
};

navigation.initHandlers = function() {
	$('#options-button').click(navigation.fn.generateMain);
};