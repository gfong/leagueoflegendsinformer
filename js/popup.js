$(document).ready(function() {
	storage.init();
	// mock.load();	
	externals.init();
	navigation.fn.generateMain();
	navigation.initHandlers();

	$("select").mouseover(function() {
		$("html").css("margin-right", 0);
	});

	$('select').change(function() {
		var summoner = $('select option:selected').val();
		var selectedRegion = $(view.components.selectedRegion).text();
		// externals.lolNexus.getSummonerGame(selectedRegion, summoner);
		externals.lolTeam.fn.getSummonerGame(selectedRegion, summoner);
	});

	$(view.components.alert).click(view.handlers.alertClick);
	$(view.components.regions).click(view.handlers.regionClick);
	// externals.lolcounter.fn.getChampCounterInfo('Sona');
});