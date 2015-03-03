'use strict';

angular.module('quakeStatsApp', ['ngResource', 'ngAnimate', 'ngRoute', 'googlechart'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        var loadQConsoleLogResolve = ['$q', '$route', 'QConsoleLogService', function ($q, $route, QConsoleLogService) {
            var dfd = $q.defer();

            var game = $route.current.params.gameId;
            QConsoleLogService.loadLog(game).then(
                function (result) {
                    dfd.resolve({
                        success: true,
                        result: result
                    });
                }, function (error) {
                    dfd.resolve({
                        success: false,
                        reason: error
                    });
                });

            return dfd.promise;
        }];

        var loadGamesLogResolve = ['$q', '$route', 'GamesLogService', function ($q, $route, GamesLogService) {
            var dfd = $q.defer();

            var game = $route.current.params.gameId;
            GamesLogService.loadLog(game).then(
                function (result) {
                    dfd.resolve({
                        success: true,
                        result: result
                    });
                }, function (error) {
                    dfd.resolve({
                        success: false,
                        reason: error
                    });
                });

            return dfd.promise;
        }];

        $routeProvider
            .when('/:gameId/flags', {
                templateUrl: '/views/flags.html',
                controller: 'FlagsCtrl',
                resolve: {
                    qconsoleLog: loadQConsoleLogResolve
                }
            })
            .when('/:gameId/maps/:flagsmapindex', {
                templateUrl: '/views/maps.html',
                controller: 'MapsCtrl',
                resolve: {
                    qconsoleLog: loadQConsoleLogResolve
                }
            })
            .when('/:gameId/kills', {
                templateUrl: '/views/kills.html',
                controller: 'KillsCtrl',
                resolve: {
                    gamesLog: loadGamesLogResolve
                }
            })
            .when('/:gameId/players', {
                templateUrl: '/views/players.html',
                controller: 'PlayersCtrl',
                resolve: {
                    gamesLog: loadGamesLogResolve
                }
            })
            .when('/:gameId/players/:id', {
                templateUrl: '/views/player.html',
                controller: 'PlayerCtrl',
                resolve: {
                    gamesLog: loadGamesLogResolve,
                    qconsoleLog: loadQConsoleLogResolve
                }
            })
			.when('/:gameId/qscore', {
                templateUrl: '/views/quake-score.html',
                controller: 'KillsCtrl',
                resolve: {
                    gamesLog: loadGamesLogResolve,
                }
            })
            .when('/:gameId/dashboard', {
                templateUrl: '/views/dashboard.html',
                controller: 'DashboardCtrl',
                resolve: {
                    gamesLog: loadGamesLogResolve,
                    qconsoleLog: loadQConsoleLogResolve
                }
            })
            .when('/:gameId/teams', {
                templateUrl: '/views/teams.html',
                controller: 'TeamsCtrl',
                resolve: {
                    gamesLog: loadGamesLogResolve,
                    qconsoleLog: loadQConsoleLogResolve
                }
            })
            .when('/admin', {
                templateUrl: '/views/admin.html',
                controller: 'AdminCtrl'
            })
            .otherwise({
                resolve: ['$location', 'GamesListService', function ($location, GamesListService) {
                    GamesListService.loadGamesList().then(function (gamesList) {
                        $location.url('/' + gamesList[gamesList.length - 1].gameId + '/dashboard');
                    });
                }]
            });

        // TODO: resolve error handling
    }])
    .run(['$routeParams', '$rootScope', function ($routeParams, $rootScope) {
        $rootScope.routeParams = $routeParams;

        $rootScope.$watch('routeParams.gameId', function (val) {
            $rootScope.routeParams.gameId = val || 0;
        });
    }]);
