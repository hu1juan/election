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

app.controller('feedbackModalCtrl',['$uibModalInstance','$scope','$location','$http', function($uibModalInstance,$scope,$location,$http){
	$scope.ok = function(){
		$uibModalInstance.dismiss();
		let sample = {
			username: $scope.loginuser,
			password: $scope.loginpass
		}
		$http.post('https://devpartnerstraining.herokuapp.com/VoterLogin',JSON.stringify(sample)).then(function successCallback(response){
			if(response.data){
				if(response.data.status === false){
					console.log('Invalid Login');
				}else{
					var hold = atob(response.data);
					var obj = angular.fromJson(hold);
					console.log(hold);
					console.log(obj);
					console.log(obj.password);
					console.log(obj.date);
					$location.path('/votehome');
				}
			}
		}, function errorCallback(response){
			alert(response.status);
		});
	
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


