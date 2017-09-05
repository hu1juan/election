'use strict'

app.controller('loginCtrl',['$scope','$uibModal', function($scope,$uibModal){
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

app.controller('voteHomeCtrl',['$scope', function($scope){
	
	//console.log($scope.currentPage);
	//console.log($scope.totalItems);
		$scope.data = [
			{"Position":"President", "Fullname":"John Mangmang"},
			{"Position":"Internal Vice-Pres ", "Fullname":"Hannie Nakila"},
			{"Position":"External Vice-Pres", "Fullname":"Reymon Dinagat"},
			{"Position":"Secretary", "Fullname":"Veah Ranario"},
			{"Position":"Treasurer", "Fullname":"Reymon Dinagat"},
			{"Position":"Asst.Secretary", "Fullname":"Reymon Dinagat"},
			{"Position":"Asst. Treasurer", "Fullname":"Reymon Dinagat"},
			{"Position":"PIO", "Fullname":"Reymon Dinagat"},
			{"Position":"Bus Manager", "Fullname":"Reymon Dinagat"},
			{"Position":"Auditor", "Fullname":"Reymon Dinagat"}
		]
		$scope.viewby = 1;














		
		$scope.totalItems = $scope.data.length;
		$scope.currentPage = 1;
		$scope.itemsPerPage = $scope.viewby;
}]);


