'use strict';

angular.module('quakeStatsApp')
    .controller('FlagsCtrl', ['$scope', '$routeParams', 'Constants', 'qconsoleLog', 'FlagsService',
        function ($scope, $routeParams, Constants, qconsoleLog, FlagsService) {
        $scope.gameId = $routeParams.gameId;
        $scope.stats = {};

        if (qconsoleLog.success === false) {
            console.log('Cannot load qconsole - you wil not be able to see Flag stats');
        } else {
            $scope.stats = FlagsService.getFlagsStats(qconsoleLog.result, $scope.gameId);
        }

        $scope.objectToArray = function(items) {
		    var result = [];
		    angular.forEach(items, function(value) {
		        result.push(value);
		    });
		    return result;
		};
    }]);