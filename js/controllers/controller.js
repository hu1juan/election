'use strict'


app.controller('adminloginCtrl',['$scope','adminLogin','VoterService', function($scope,adminLogin,VoterService){
	adminLogin.checkToken();
	$scope.login = function(){
		adminLogin.login($scope.adminuser,$scope.adminpass);
	}

	$scope.getmyVoters = function(){
		VoterService.gettingVoters().then(function(response){
			$scope.list = response.data;
		})
	};
	$scope.getmyVoters();
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

app.controller('feedbackModalCtrl',['$uibModalInstance','$scope','$location','$http','$localStorage','userLogin', function($uibModalInstance,$scope,$location,$http,$localStorage,userLogin){
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
					// var hold = atob(response.data);
					// var obj = angular.fromJson(hold);
					// console.log(hold);
					// console.log(obj);
					// console.log(obj.password);
					// console.log(obj.date);
					$location.path('/votehome');
					userLogin.user = $scope.loginuser;
					$localStorage.userLogin = userLogin.user;
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

app.controller('adminCtrl',['$scope','candidateGet','adminManagementFunction','voterGet','$http','adminLogin','CandidateService','VoteService','$localStorage', function($scope,candidateGet,adminManagementFunction,voterGet,$http,adminLogin,CandidateService,VoteService,$localStorage){

	$scope.countingVote = $localStorage.finalCountVote;
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

	CandidateService.getCandidate().then(function(response){
		$scope.candidates = response.data;
		$scope.count = response.data.length + 1;
	})

	// candidateGet.getCandidates().then(function(data){
	// 	$scope.candidates = data;
	// 	$scope.count = data.length + 1;
	// })

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
	$scope.editcandidates = function(idcandidate,firstname,middlename,lastname,gender,position){
		// console.log(idcandidate,firstname,middlename,lastname,gender,position);
		adminManagementFunction.editCandidate(idcandidate,firstname,middlename,lastname,gender,position);
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

app.controller('voteHomeCtrl',['$scope','$http','$localStorage','candidateGetData','votingService','userLogin' ,'CandidateService', function($scope,$http,$localStorage,candidateGetData,votingService,userLogin,CandidateService){

	// $localStorage.userLogin = "";
	userLogin.checkToken();
	votingService.hey();

    userLogin.checkToken();
    votingService.hey();

    $('.collapse').on('show.bs.collapse', function (e) {
        $('.collapse').not(e.target).removeClass('in');
    })
    candidateGetData.candidates().then(function(data){$scope.candidatesData = data;})
    
    //$localStorage.votes = [];
    $scope.submitvotes = function(){
    	// $localStorage.finalCountVote = [];	
		votingService.submitvotes ();
    };

    $scope.selectVotePress = function(id,fname,mname,lname,position){

    	votingService.voteSelect(id,fname,mname,lname,position);

    	
    	// console.log(id);
    	// console.log(fname);
    	// console.log(mname);
    	// console.log(lname);
    	// console.log(position);
    }
}]);

app.controller('voteViewCtrl',['$scope', '$http', '$location','$localStorage','userLogin','votingService', function($scope,$http,$location,$localStorage,userLogin,votingService){
    $scope.disss = $localStorage.countVotes;

    userLogin.checkToken();
    $location.path('/voteview');
    $scope.logout = function(){
        $localStorage.votes = [];
        $localStorage.temCountVote = [];
        $localStorage.countVotes = [];
        userLogin.logout();
    }
    $scope.finalsubmit = function(){
    	for(var i = 0; i < $localStorage.countVotes.length; i++){
    		console.log($localStorage.countVotes[i].name_candidate);
    		console.log($localStorage.countVotes[i].position)
    	}
    }
}]);
