$(document).ready(function() {
	storage.init();
	mock.load();
	externals.load();

	view.generateHtmlForTeam('purple-team', mock.purpleTeam);
	view.generateHtmlForTeam('blue-team', mock.blueTeam);
	// $(".blue-team").html(blueHtml);

	$("select").mouseover(function() {
		$("html").css("margin-right", 0);
	});
});