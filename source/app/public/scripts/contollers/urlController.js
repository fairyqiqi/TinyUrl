var app = angular.module("tinyurlApp");

app.controller("urlController", ["$scope", "$http", "$routeParams", function ($scope, $http, $routeParams) {
    $http.get("/api/v1/urls/" + $routeParams.shortUrl)
        .then(function (response) {
            var data = response.data;
            $scope.shortUrl = data.shortUrl;
            $scope.longUrl = data.longUrl;
            $scope.shortUrlToShow = "http://localhost:7777/" + data.shortUrl;
        });

    $http.get("/api/v1/urls/" + $routeParams.shortUrl + "/totalClicks")
        .then(function (response) {
            $scope.totalClicks = response.data;
        });

    var renderChart = function (chart, topic) {
        $scope[chart + 'Labels'] = [];
        $scope[chart + 'Data'] = [];
        $http.get("/api/v1/urls/" + $routeParams.shortUrl + "/" + topic)
            .then(function (response) {
                response.data.forEach(function (info) {
                    $scope[chart + 'Labels'].push(info._id);
                    $scope[chart + 'Data'].push(info.count);
                });
            });
    };
    renderChart('pie', 'referer');
    renderChart('bar', 'country');
}]);