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

    $scope.getClicksByTime = function (time) {
        $scope.lineLabels = [];
        $scope.lineData = [];
        $scope.time = time;
        $http.get("/api/v1/urls/" + $routeParams.shortUrl + "/" + time)
            .then(function (response) {
                response.data.forEach(function (info) {

                    var legend = '';
                    if (time === 'hour') {
                        if (info._id.minute < 10) {
                            info._id.minute = '0' + info._id.minute;
                        }
                        legend = info._id.hour + ":" + info._id.minute;
                    } else if (time === 'day') {
                        legend = info._id.hour + ":00";
                    } else if (time === 'month') {
                        legend = info._id.day + "/" + info._id.month;
                    }

                    $scope.lineLabels.push(legend);
                    $scope.lineData.push(info.count);
                });
            });
    };

    $scope.getClicksByTime('hour');
    
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
    renderChart('doughnut', 'platform');
    renderChart('base', 'browser');
}]);