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
app.controller('adminCtrl',['$scope','candidateGet','adminManagementFunction', function($scope,candidateGet,adminManagementFunction){

	candidateGet.getCandidates().then(function(data){
		$scope.candidates = data;
		$scope.count = data.length + 1;
	})

	$scope.candidateregister = function(val1,val2,val3,val4,val5){
		adminManagementFunction.registercandidates(val1,val2,val3,val4,val5);
		candidateGet.getCandidates().then(function(data){$scope.count = data.length + 1;})
	}

	$scope.editadmin = function(id){
		adminManagementFunction.editadminmanagement(id);
	};
}]);

app.controller('editAdminModalCtrl',['$scope','adminManagementFunction','$uibModalInstance','candidateGet', function($scope,adminManagementFunction,$uibModalInstance,candidateGet){
	$scope.ids = adminManagementFunction.idcandidate;
	candidateGet.getCandidates().then(function(data){
		$scope.candidates = data;
	})
	$scope.comfirmation = function(){
		adminManagementFunction.editCandidate();
		adminManagementFunction.confirmationadmin();
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

app.controller('voteHomeCtrl',['$scope','$http','candidateGetData', function($scope,$http,candidateGetData){

    $('.collapse').on('show.bs.collapse', function (e) {
    $('.collapse').not(e.target).removeClass('in');
})
    candidateGetData.candidates().then(function(data){$scope.candidatesData = data;})
  // $http({
  //       method: 'GET',
  //       url: 'https://devpartnerstraining.herokuapp.com/CandidateGet'
  //       }).then(function successCallback(response){
  //           $scope.myData = response.data;
  //       },function errorCallback(response){

  //       })
    
}]);


