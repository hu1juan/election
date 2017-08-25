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