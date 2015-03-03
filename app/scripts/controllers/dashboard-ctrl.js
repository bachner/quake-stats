'use strict';

angular.module('quakeStatsApp')
    .controller('DashboardCtrl', ['$scope', '$routeParams', 'gamesLog', 'qconsoleLog', 'KillsService', 'FlagsService',
        function ($scope, $routeParams, gamesLog, qconsoleLog, KillsService, FlagsService) {
        $scope.gameId = $routeParams.gameId;
        $scope.flagsStats = {};

        if (gamesLog.success === false) {
            console.log('Cannot load games.log - you wil not be able to see kills stats');
            return;
        }

        if (qconsoleLog.success === false) {
            console.log('Cannot load qconsole - you wil not be able to see Flag stats');
            return;
        }

        $scope.killsStats = KillsService.getKillsStats(gamesLog.result, $scope.gameId);
        $scope.flagsStats = FlagsService.getFlagsStats(qconsoleLog.result, $scope.gameId);
        $scope.playersCount = Object.keys($scope.killsStats.players).length;

        $scope.dashboardItems = [
            {
                playersList: $scope.killsStats.topKillers,
                title: 'Top Killer',
                property: 'kills.length'
            },
            {
                title: 'Wins',
                isCustom: true,
                template: '/templates/custom-dashboard-item-wins-tmpl.html',
                type: 'neutral'
            },
            {
                playersList: $scope.flagsStats.topOverallScorers,
                title: 'Top Scorer',
                property: 'value',
                icon: 'medal_frags'
            },
            {
                playersList: $scope.killsStats.topVictims,
                title: 'Top Victim',
                property: 'deaths.length',
                type: 'bad'
            },
            {
                playersList: $scope.killsStats.topHumilators,
                title: 'Top Humiliator',
                property: 'humiliations.length',
                icon: 'gauntlet'
            },
            {
                playersList: $scope.killsStats.topImmortal,
                title: 'Top Immortal',
                property: 'killsDeathDiff',
                description: '/templates/description-dashboard-item-immortal-tmpl.html'
            },
            {
                playersList: $scope.killsStats.topFifthColumns,
                title: 'Top Fifth Column',
                property: 'teammatesKills.length',
                type: 'bad'
            },
			{
                playersList: $scope.killsStats.topQScorer,
                title: 'Best Quake Scorer',
                property: 'qscore',
				description: '/templates/custom-dashboard-item-qscore-tmpl.html'
            },
            {
                playersList: $scope.flagsStats.topOverallFetchToCaptureRatioPlayers,
                title: 'Top Fetch To Capture Ratio',
                property: 'value',
                description: '/templates/description-dashboard-item-fetch-to-capture-ratio-tmpl.html'
            },
            {
                title: 'Total Players',
                isCustom: true,
                template: '/templates/custom-dashboard-item-players-count-tmpl.html',
                type: 'neutral'
            }
        ];
	}]);