
angular.module('api', [])

    .controller('apictrl', function($scope, $http) {
        $scope.a = false;

        $scope.getproduct = function () {
            $http.get('http://api.walmartlabs.com/v1/search?apiKey=bwwkxupm3s275sdcnb42bekg&lsPublisherId={Your LinkShare Publisher Id}&query='+$scope.search).then(function (t) {
                console.log(t);
                $scope.x = t.data.items;

                /*$scope.url = "https://stream.watsonplatform.net/text-to-speech/api/v1/synthesize?username=e27b1bbf-8961-42e0-bf1e-993bc8f6e307&password=ye1fd35zzlPQ&text="+ "caloriesperservingquantityof "+ $scope.searchfood;*/

                $scope.a = true;
            })

        }



    });