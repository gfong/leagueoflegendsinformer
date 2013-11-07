var externals = { };

externals.lolKing = { };
externals.lolKing.loadCount = 0;
externals.lolKing.url = 'http://www.lolking.net/';
externals.lolKing.queries = { 
	summonerSearch: 	'search?name=',
	summonerStats: 		'summoner/',
	summonerExists: 	'.search_result_item>div>div:nth-child(1)',
	summonerName: 		'div:nth-child(2)>div:nth-child(2)>div>a',
	summonerLevel: 		'.summoner_titlebar>div:nth-child(2)>div:nth-child(2)',
	champStats: 		'.season_3_ranked_stats td',
	normalWins: 		'.lifetime_stats_val',
	rankedWinsLosses: 	'.featured>div'
};

externals.lolKing.remove = {
	images: [
		'url("http://lkimg.zamimg.com/images/logo-urf-halloween.gif")',
		'//lkimg.zamimg.com/images/logo-text.png',
		'//lkimg.zamimg.com/images/icon-sword.png',
		'//lkimg.zamimg.com/images/icon-shield.png',
		'//lkimg.zamimg.com/images/icon-hand.png',
		'//lkimg.zamimg.com/images/icon-3-skulls.png',
		'//lkimg.zamimg.com/images/icon-skull.png',
		'//lkimg.zamimg.com/images/icon-broken-turret.png',
		'//lkimg.zamimg.com/images/rp_logo.png',
		'//lkimg.zamimg.com/images/zam-white.png',
	]
} 

// externals.elophant = { };
// externals.elophant.url = 'http://www.elophant.com/';

// externals.lolNexus = { };
// externals.lolNexus.url = 'http://www.lolnexus.com/';
// externals.lolNexus.replaceScript = '<script type="text/javascript" src="http://static-noxia.cursecdn.com/1-0-5043-14515/js/core.js"></script>';
// externals.lolNexus.actualScript = '<script type="text/javascript" src="js/lolnexus-core.js"></script>';
// externals.lolNexus.queries = { };
// externals.lolNexus.queries.notInGame = '.error';
// externals.lolNexus.queries.map = '.j-noxia-search .header-bar h2';
// externals.lolNexus.queries.blueTeam = '.team-1 table tbody';
// externals.lolNexus.remove = { };
// externals.lolNexus.remove.location = 'js/text_remove/lol_nexus/';
// externals.lolNexus.remove.files = [ 
// 'styling.txt', 
// 'cobalt_script_1.txt',
// // 'comScore_script_1.txt',
// 'crazy_egg_script_1.txt',
// // 'footer_html_1.txt',
// 'google_script_1.txt',
// // 'google_script_2.txt',
// // 'nielsen_online_script_1.txt',
// // 'netbar_html_1.txt',
// 'html_section_1.txt'
// ];

externals.lolTeam = { 
	url: 						'http://www.lolteam.net/',
	queries: {
		notInGame: 				'.alert-error:first-child',
		allSummonerNames: 		'.player-card-title>a',
		allSummonerRanks: 		'.player-card-rating-container>img',
		allSummonerChampData: 	'.player-card-champion-text',
		champName: 				'.bold-text',
		champKDA: 				'b',
		champPlayedRankRegex: 	/(\d*(th|st|rd|nd) most played)|(Favorite)/,
		champGames: 			'b:nth-child(4)'
	}
};

// externals.lolMeepo = { };
// externals.lolMeepo.url = 'https://teemojson.p.mashape.com/';

// externals.lolMeepo.statTypes = { 
// 	gamesPlayed: 	'TOTAL_SESSIONS_PLAYED',
// 	gamesLost: 		'TOTAL_SESSIONS_LOST',
// 	gamesWon: 		'TOTAL_SESSIONS_WON',
// 	totalKills: 	'TOTAL_CHAMPION_KILLS',
// 	damageDealt: 	'TOTAL_DAMAGE_DEALT',
// 	damageTaken: 	'TOTAL_DAMAGE_TAKEN',
// 	killsPerGame: 	'TOTAL_CHAMPION_KILLS_PER_SESSION',
// 	totalCS: 		'TOTAL_MINION_KILLS',
// 	totalDblKills: 	'TOTAL_DOUBLE_KILLS',
// 	totalTrplKills: 'TOTAL_TRIPLE_KILLS',
// 	totalQdraKills: 'TOTAL_QUADRA_KILLS',
// 	totalPntaKills: 'TOTAL_PENTA_KILLS',
// 	deathsPerGame: 	'TOTAL_DEATHS_PER_SESSION',
// 	totalGold: 		'TOTAL_GOLD_EARNED',
// 	mostSpellsCast: 'MOST_SPELLS_CAST',
// 	totalTurrets: 	'TOTAL_TURRETS_KILLED',
// 	magicDealt: 	'TOTAL_MAGIC_DAMAGE_DEALT',
// 	physicalDealt: 	'TOTAL_PHYSICAL_DAMAGE_DEALT',
// 	totalAssists: 	'TOTAL_ASSISTS',
// 	totalTimeDead: 	'TOTAL_TIME_SPENT_DEAD',
// 	totalFirstBlood:'TOTAL_FIRST_BLOOD',
// 	totalUnrealKill:'TOTAL_UNREAL_KILLS',
// 	maxDeaths: 		'MAX_NUM_DEATHS',
// 	maxKills: 		'MAX_CHAMPIONS_KILLED'
// };

externals.lolcounter = {
	url:'http://www.lolcounter.com/',
	queries: {
		getChampCounters: 'champ/',
		getAllCounters: '#All #counterpicks-list .picks-panel-link',
		getAllStrongs: '#All #goodagainst-list .picks-panel-link',
		getBottomCounters: '#Bottom #counterpicks-list .picks-panel-link',
		getTopCounters: '#Top #counterpicks-list .picks-panel-link',
		getGeneralCounters: '#General #counterpicks-list .picks-panel-link',
		getChampName: /\w+\s?'?\w+(?=        )/,
		getBarPercent: '.bar'
	},
	temporaryChampCounterData: {

	}
}