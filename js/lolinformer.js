/**
* Starts the JavaScript for the extension
*/

var lolinformer = {
	init: function() {
		storage.init();
		// mock.load();	
		externals.init();
		navigation.fn.generateMain();
		navigation.initHandlers();

		$('select').change(function() {
			var summoner = $('select option:selected').val();
			var selectedRegion = $(view.components.selectedRegion).text();
			// externals.lolNexus.getSummonerGame(selectedRegion, summoner);
			externals.lolTeam.fn.getSummonerGame(selectedRegion, summoner);
		});

		$(view.components.alert).click(view.handlers.alertClick);
		$(view.components.regions).click(view.handlers.regionClick);
	}
};

$(document).ready(function() {
	lolinformer.init();
});