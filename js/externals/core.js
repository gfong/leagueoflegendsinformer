externals.init = function() {
	externals.lolcounter.fn.init();
}

externals.generateRequestMessage = function (request) {
	return 'Requesting data from ' + request + '...';
};