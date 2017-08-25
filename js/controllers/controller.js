'use strict'

app.controller('loginCtrl',['$scope','$uibModal',function($scope,$uibModal){
	$scope.open = function(size){
		$uibModal.open({
			animation: true,
			templateUrl: 'modal/loginmodal.html',
			controller: 'feedbackModalCtrl',
			windowClass: 'app-modal-window',
			size: size,
		}).result.then(function(){},function(res){})
	};
}]);

app.controller('feedbackModalCtrl',['$uibModalInstance','$scope','$location', function($uibModalInstance,$scope,$location){
	$scope.ok = function(){
		$uibModalInstance.dismiss();
		$location.path('/admin');
	}

	$scope.cancel = function(){
		$uibModalInstance.dismiss();
	}
}]);

app.controller('adminCtrl',['$scope', function($scope){
	
}]);

app.controller('voteHomeCtrl',['$scope', function($scope){
	$scope.totalItems = 10;
	$scope.currentPage = 1;
}]);

app.controller('samplecontroller', ['$scope',function ($scope) {

  
 $scope.showData = function( ){

 $scope.curPage = 0;
 $scope.pageSize = 3;
     $scope.datalists = [
         { "name": "John","age":"16","designation":"Software Engineer1"},
    {"name": "John2","age":"21","designation":"Software Engineer2"},
    {"name": "John3","age":"19","designation":"Software Engineer3"},
    {"name": "John4","age":"17","designation":"Software Engineer4"},
    {"name": "John5","age":"21","designation":"Software Engineer5"},
    {"name": "John6","age":"31","designation":"Software Engineer6"},
    {"name": "John7","age":"41","designation":"Software Engineer7"},
    {"name": "John8","age":"16","designation":"Software Engineer8"},
    {"name": "John18","age":"16","designation":"Software Engineer9"},
    {"name": "John28","age":"16","designation":"Software Engineer10"},
    {"name": "John38","age":"16","designation":"Software Engineer11"},
    {"name": "John48","age":"16","designation":"Software Engineer12"},
    {"name": "John58","age":"16","designation":"Software Engineer13"},
    {"name": "John68","age":"16","designation":"Software Engineer14"},
    {"name": "John68","age":"16","designation":"Software Engineer15"}
]
     $scope.numberOfPages = function() {
				return Math.ceil($scope.datalists.length / $scope.pageSize);
			};
         
}


}]);

app.filter('pagination', function()
{
 return function(input, start)
 {
  start = +start;
  return input.slice(start);
 };
});
