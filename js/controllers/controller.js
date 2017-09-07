'use strict'


app.controller('adminloginCtrl',['$scope','adminLogin', function($scope,adminLogin){
	adminLogin.checkToken();
	$scope.login = function(){
		adminLogin.login($scope.adminuser,$scope.adminpass);
	}
}]);

app.controller('loginCtrl',['$scope','$uibModal','registration','userLogin', function($scope,$uibModal,registration,userLogin){
	userLogin.checkToken();
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

app.controller('feedbackModalCtrl',['$uibModalInstance','$scope','$location','$http','$localStorage', function($uibModalInstance,$scope,$location,$http,$localStorage){
	$scope.ok = function(){
		$uibModalInstance.dismiss();
		let sample = {
			username: $scope.loginuser,
			password: $scope.loginpass
		}
		$http.post('https://devpartnerstraining.herokuapp.com/VoterLogin',JSON.stringify(sample)).then(function successCallback(response){
			if(response.data){
				if(response.data.status === false){
					alert('Invalid Login');
				}else{
					$localStorage.userToken = true;
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

app.controller('adminCtrl',['$scope','candidateGet','adminManagementFunction','voterGet','$http','adminLogin', function($scope,candidateGet,adminManagementFunction,voterGet,$http,adminLogin){

	adminLogin.checkToken();
	$http({
		method: 'GET',
		url: 'https://devpartnerstraining.herokuapp.com/VoterGet'
	}).then(function successCallback(response){
		$scope.voterslist = response.data;
	},function errorCallback(response){

	})

	voterGet.getVoters().then(function(data){
		$scope.voters = data;
	})

	candidateGet.getCandidates().then(function(data){
		$scope.candidates = data;
		$scope.count = data.length + 1;
	})
	$scope.logout = function(){
		adminLogin.logout();
	}
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

app.controller('voteHomeCtrl',['$scope','$http','candidateGetData','votingService','userLogin' , function($scope,$http,candidateGetData,votingService,userLogin){

	userLogin.checkToken();
	$scope.logout = function(){
		userLogin.logout();
	}
    $('.collapse').on('show.bs.collapse', function (e) {
	    $('.collapse').not(e.target).removeClass('in');
	})
    candidateGetData.candidates().then(function(data){$scope.candidatesData = data;})

    $scope.submitvotes = function(press,internalvicepress,externalvicepress,secretary,asstSec,treasurer,asstTreas,auditor,pio,busManager){

    		votingService.submitvotes ($scope.press,$scope.internalvicepress,$scope.externalvicepress,$scope.secretary,$scope.asstSec,$scope.treasurer,
    			$scope.asstTreas,$scope.auditor,$scope.pio,$scope.busManager);

    	// console.log($scope.press);
    	// console.log($scope.internalvicepress);
    	// console.log($scope.externalvicepress);
    	// console.log($scope.secretary);
    	// console.log($scope.asstSec);
    	// console.log($scope.treasurer);
    	// console.log($scope.asstTreas);
    	// console.log($scope.auditor);
    	// console.log($scope.pio);
    	// console.log($scope.busManager);
    };
}]);

app.controller('voteViewCtrl',['$scope', '$http', '$location','userLogin','votingService', function($scope,$http,$location,userLogin,votingService){
	userLogin.checkToken();
	$location.path('/voteview');
	$scope.logout = function(){
		userLogin.logout();
	}
}]);
