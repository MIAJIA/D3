(function(){
'use strict';

angular.module('DataVisorServices', [])
.factory('DataSource', [
	'$http',
    DataSourceService
]);


function DataSourceService($http) {
	return {
		get: function(range) {
			return $http.get(range + "Data.json");
		}
	}
}

}());