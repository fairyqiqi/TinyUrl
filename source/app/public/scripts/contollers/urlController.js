var app = angular.module("tinyurlApp");

app.controller("urlController", ["$scope", "$http", "$routeParams", function ($scope, $http, $routeParams) {
    $http.get("/api/v1/urls/" + $routeParams.shortUrl)
        .then(function (response) {
            var data = response.data;
            $scope.shortUrl = data.shortUrl;
            $scope.longUrl = data.longUrl;
            $scope.shortUrlToShow = "http://localhost:7777/" + data.shortUrl;
        });
}]);