'use strict'

app.service("voterGet",["$http", function($http){
	return {
		getVoters: function(){
			return $http({
					method: 'GET',
					url: 'https://devpartnerstraining.herokuapp.com/VoterGet'
				}).then(function successCallback(response) {
			    	return response.data;
				}, function errorCallback(response) {
				  // called asynchronously if an error occurs
				    // or server returns response with an error status.
			})
		}
	}
}]);

app.service("candidateGet",["$http", function($http){
	return{
		getCandidates: function(){
			return $http({
				method: 'GET',
				url: 'https://devpartnerstraining.herokuapp.com/CandidateGet'
			}).then(function successCallback(response){
				return response.data;
			},function errorCallback(response){

			})
		}
	}
}]);

app.service("registration",["voterGet","$http", function(voterGet,$http){
	this.register = function(fName,mName,lName,gender,user,pass,pass2){
		voterGet.getVoters().then(function(data) {
			var registeredVOTERS = data;
			let sample = {
				first_name: fName,
				middle_name: mName,
				last_name: lName,
				gender: gender,
				username: user,
				password: pass
			}

			if(registeredVOTERS.findIndex(sample => sample.username === user) == -1){
				if(pass===pass2){
					$http.post('https://devpartnerstraining.herokuapp.com/VoterSet',JSON.stringify(sample)).then(function successCallback(response){
						if(response.data){
							alert("Posting data successful.");
						}
					}, function errorCallback(response){
						alert(response.status);
					});
				}else{
					alert("Password mismatch.")
				}
			}else{
				alert('Username is already taken.');
			}

			console.log(registeredVOTERS);
			console.log(fName);
			console.log(mName);
			console.log(lName);
			console.log(gender);
			console.log(user);
			console.log(pass);
			console.log(pass2);
		})
	};
}]);

app.service("adminManagementFunction",["$uibModal","$http","candidateGet", function($uibModal,$http,candidateGet){

	this.editadminmanagement = function(id){
		this.idcandidate = id;
		$uibModal.open({
			animation: true,
			templateUrl: 'modal/editadmin.html',
			controller: 'editAdminModalCtrl'
		}).result.then(function(){},function(res){})
	}

	this.confirmationadmin= function(){
		$uibModal.open({
			animation: true,
			templateUrl: 'dialog/dialogconfirmation.html',
			controller: 'confirmAdminCtrl'
		}).result.then(function(){},function(res){})
	}

	this.registercandidates = function(fname,mname,lname,gender,position){

		candidateGet.getCandidates().then(function(data){
			var candidatesmember = data;
			let sample1 = {
				first_name: fname,
				middle_name: mname,
				last_name: lname,
				gender: gender,
				position: position,
				isDeleted: 0
			}

			var id = candidatesmember.findIndex(sample1 => sample1.last_name === lname && sample1.first_name === fname && sample1.middle_name === mname);
			if(id == -1){
				var i = candidatesmember.findIndex(sample1 => sample1.last_name === lname && sample1.first_name === fname && sample1.middle_name === mname && sample1.position === position);
				if(i == -1){
					$http.post('https://devpartnerstraining.herokuapp.com/CandidateSet',JSON.stringify(sample1)).then(function successCallback(response){
						if(response.data){
							alert("Posting data successful.");
						}
					}, function errorCallback(response){
						alert(response.status);
					});
					// alert('ok');
				}else{
					alert('you already have position.');
				}
			}else{
				alert('already register candidate.');
			}
		})
	}

	this.editCandidate = function(){
		// alert('ok');
	}
}]);