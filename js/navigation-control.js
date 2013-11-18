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
					
					$('.edit-summoners>div').click(function() {
						$(this).toggleClass('selected');
						var checkbox = $(this).find('input');
						$(checkbox).prop('checked', !$(checkbox).prop('checked'));
					});
					$('.edit-summoners .delete-button').click(storage.handlers.deleteSummoner);
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