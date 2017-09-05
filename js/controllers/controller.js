'use strict'

app.controller('loginCtrl',['$scope','$uibModal','registration', function($scope,$uibModal,registration){
	$scope.open = function(size){
		$uibModal.open({
			animation: true,
			templateUrl: 'modal/loginmodal.html',
			controller: 'feedbackModalCtrl',
			windowClass: 'app-modal-window',
			size: size,
		}).result.then(function(){},function(res){})
	};

	$scope.reg = function(){
		registration.register($scope.fName,$scope.mName,$scope.lName,$scope.gender,$scope.user,$scope.pass,$scope.pass2);
	}
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

//modal admin
app.controller('adminCtrl',['$scope','$uibModal','candidateGet', function($scope,$uibModal,candidateGet){

	candidateGet.getCandidates().then(function(data){$scope.candidates = data;})

	// $http({
	// 	method: 'GET',
	// 	url: 'https://devpartnerstraining.herokuapp.com/CandidateGet'
	// }).then(function successCallback(response) {
 //    	$scope.candidates = response.data;
	// }, function errorCallback(response) {
	//   // called asynchronously if an error occurs
	//     // or server returns response with an error status.
	// });
	$scope.editadmin = function(){
		$uibModal.open({
			animation: true,
			templateUrl: 'modal/editadmin.html',
			controller: 'editAdminModalCtrl'
		}).result.then(function(){},function(res){})
	};
}]);

app.controller('editAdminModalCtrl',['$uibModalInstance','$scope','$location','$uibModal', function($uibModalInstance,$scope,$location,$uibModal){
	$scope.comfirmation = function(){
		$uibModal.open({
			animation: true,
			templateUrl: 'dialog/dialogconfirmation.html',
			controller: 'confirmAdminCtrl'
		}).result.then(function(){},function(res){})
	}
	$scope.canceladmin = function(){
		$uibModalInstance.dismiss();
	}
}]);

app.controller('confirmAdminCtrl',['$scope','$uibModalInstance', function($scope,$uibModalInstance){
	$scope.confirmok = function(){
		alert('successfull save');
		$uibModalInstance.dismiss();
	}
}]);

app.controller('voteHomeCtrl',['$scope','$http', function($scope,$http){
	$scope.oneAtATime = true;

	$scope.status = {
    isCustomHeaderOpen: false,
    isFirstOpen: true,
    isFirstDisabled: false
  };
    $http.get("https://devpartnerstraining.herokuapp.com/CandidateGet").then(function (response) {
              $scope.myData = response.data;
          })
}]);


