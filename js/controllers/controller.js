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
app.controller('adminCtrl',['$scope','candidateGet','adminManagementFunction', function($scope,candidateGet,adminManagementFunction){

	candidateGet.getCandidates().then(function(data){$scope.candidates = data;})

	$scope.candidateregister = function(val1,val2,val3,val4,val5){
		adminManagementFunction.registercandidates(val1,val2,val3,val4,val5);
	}

	$scope.editadmin = function(){
		adminManagementFunction.editadminmanagement();
	};
}]);

app.controller('editAdminModalCtrl',['$scope','adminManagementFunction','$uibModalInstance', function($scope,adminManagementFunction,$uibModalInstance){
	$scope.comfirmation = function(){
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


