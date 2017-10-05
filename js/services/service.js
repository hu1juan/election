'use strict'

app.factory('VoterService',[
	'$http',
	'$q',
	function(
		$http,
		$q){
		var baseUrl = 'https://devpartnerstraining.herokuapp.com/';
		var factory = this;
		factory.gettingVoters = function(){
			var defer = $q.defer();

			$http({
				method: 'GET',
				url: baseUrl+'VoterGet'
			}).then(function(response){
				factory.data = response.data;
				return defer.resolve(response);
			}, function(error){
				return defer.reject(error);
			});
			return defer.promise;
		}
		return factory;
	}
]);

app.factory('VoteService', [
	'$http',
	'$q',
	function(
		$http,
		$q)
	{
		var baseUrl = 'https://devpartnerstraining.herokuapp.com/';
		var factory = this;

		factory.getVotes = function(id){
			var defer = $q.defer();

			$http({
				method: 'GET',
				url: baseUrl + 'VoteGet/' + id
			}).then(function(response){
				factory.data = response.data;
				return defer.resolve(response);
			}, function(error){
				return defer.reject(error);
			});
			return defer.promise;
		}

		factory.postVote = function(){
			var defer = $q.defer();

			$http({
				method: 'POST',
				url: baseUrl + 'VoteSet'
			}).then(function(response){
				return defer.resolve(resolve);
			}, function(error){
				return defer.reject(error);
			});
			return defer.promise;
		}
		return factory;
	}
]);

app.factory('CandidateService', [
	'$http',
	'$q',
	function(
		$http,
		$q)
	{
		var baseUrl = 'https://devpartnerstraining.herokuapp.com/';
		var factory = this;

		factory.getCandidate = function(){
			var defer = $q.defer();

			$http({
				method: 'GET',
				url: baseUrl + 'CandidateGet'
			}).then(function(response){
				return defer.resolve(response);
			}, function(error){
				return defer.reject(error);
			});
			return defer.promise;
		}

		factory.postCandidate = function($data){
			var defer = $q.defer();

			$http({
				method: 'POST',
				url: baseUrl + 'CandidateSet',
				data: $data
			}).then(function(response){
				return defer.resolve(response);
			}, function(error){
				return defer.reject(error);
			});

			return defer.promise;
		}

		factory.setCandidate = function(id, $data){
			var defer = $q.defer();

			$http({
				method: 'POST',
				url: baseUrl + 'CandidateSet/' + id,
				data: $data
			}).then(function(response){
				return defer.resolve(response);
			}, function(error){
				return defer.reject(error);
			});

			return defer.promise;
		}

		return factory;
	}

]);

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

app.service("adminLogin",['$location','$localStorage',function($location,$localStorage){
	if(!$localStorage.isToken){
		$localStorage.isToken = false;
	}
	this.checkToken = function(){
		if($localStorage.isToken == true){
			$location.path('/admin');
		}else{
			$location.path('/adminlogin');
		}
	}

	this.logout = function(){
		$localStorage.isToken = false;
		$location.path('/adminlogin');
	}


	this.login = function(user,pass){
		if(user === 'admin'){
			if(pass === 'admin_123'){
				$localStorage.isToken = true;
				$location.path('/admin');
			}else{
				alert('Invalid password.')
			}
		}else{
			alert('Invalid Account');
		}
	}
}]);

app.service("userLogin",['$location','$localStorage',function($location,$localStorage){
	if(!$localStorage.userToken){
		$localStorage.userToken = false;
	}
	if(!$localStorage.finalCountVote){
		$localStorage.finalCountVote = [];
	}
	this.user='';
	this.checkToken = function(){
		if($localStorage.userToken == true){
			var data = $localStorage.finalCountVote;
			let a = {
				voteruser: $localStorage.userLogin
			}
			if(data.findIndex(a => a.voteruser === $localStorage.userLogin) == -1){
				$location.path('/votehome');
			}else{
				$location.path('/voteview');
			}
		}else{
			$location.path('/');
		}
	}

	this.logout = function(){
		$localStorage.userToken = false;
		$location.path('/');
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
			// console.log(registeredVOTERS);
			// console.log(fName);
			// console.log(mName);
			// console.log(lName);
			// console.log(gender);
			// console.log(user);
			// console.log(pass);
			// console.log(pass2);
		})
	};
}]);

app.service("adminManagementFunction",["$uibModal","$http","candidateGet","CandidateService", function($uibModal,$http,candidateGet,CandidateService){


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

		if(position == null || gender == null){
			alert('ok');
		}else{
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

						CandidateService.postCandidate(sample1).then(function(response){
							if(response.data){
								alert("Posting data successful.");
							}
						});

					}else{
						alert('you already have position.');
					}
				}else{
					alert('already register candidate.');
				}
			})
		}
	}

	this.editCandidate = function(idcandidate,fname,mname,lname,gender,position){
		// alert('ok');
		let sample1 = {
			first_name: fname,
			middle_name: mname,
			last_name: lname,
			gender: gender,
			position: position,
			isDeleted: 0
		}
		console.log(sample1);
		CandidateService.setCandidate(idcandidate,sample1).then(function(response){
			if(response.data){
				alert('Update data');
			}
		})
		// $http.post('https://devpartnerstraining.herokuapp.com/CandidateSet/'+idcandidate,JSON.stringify(sample1)).then(function successCallback(response){
		// 	if(response.data){
		// 		alert("Update successful.");
		// 	}
		// }, function errorCallback(response){
		// 	alert(response.status);
		// });
		console.log(idcandidate);
		console.log(fname);
		console.log(mname);
		console.log(lname);
		console.log(gender);
		console.log(position);
}
}]);



app.service("candidateGetData",['$http',function($http){
	return{
		candidates: function(){
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

app.service("votingService",['$http','$location','$localStorage','candidateGetData','userLogin','CandidateService', function($http,$location,$localStorage, candidateGetData, userLogin,CandidateService){

		var holder={};
		var index = -1;
		var count = 1;
		this.hey = function(){

			let sam = {
				username: userLogin.user
			}
			$http.get('https://devpartnerstraining.herokuapp.com/VoterGet').then(function success(response){
				holder = response.data;
				index = holder.findIndex(sam => sam.username === userLogin.user);
				// console.log(holder[index].id);
			}, function failure(response){

			});
		
		}

		this.voteSelect = function(id,fname,mname,lname,position){
			 
			
			 if(!$localStorage.countVotes){
			 	 $localStorage.countVotes = [];
			 }
			 if(!$localStorage.finalCountVote){
			 	$localStorage.finalCountVote =[];
			 }

			var fullname = (fname +" "+ mname+ " "+lname);
	    	let votes = {
	    		candidate_id: id,
	    		voter_id: $localStorage.userLogin,
	    		name_candidate: fullname,	
	    		position: position

	    	}
	    	console.log(votes);

	    	var getIndex = $localStorage.countVotes.findIndex(votes => votes.voter_id === $localStorage.userLogin);
	    	if(getIndex == -1){
	    		$localStorage.countVotes.push(votes);
	    	}else{
	    		var userAndPosition = $localStorage.countVotes.findIndex(votes => votes.voter_id === $localStorage.userLogin && votes.position === position);
	    		if(userAndPosition == -1){
	    			$localStorage.countVotes.push(votes);
	    		}
	    		else{
	    			$localStorage.countVotes[userAndPosition].candidate_id = id;
	    			$localStorage.countVotes[userAndPosition].name_candidate = fullname;
	    		}
	    	}
	    	
		}


        this.submitvotes = function(){
        	let finalvotes = {}
        	var count = 0;
        	if($localStorage.finalCountVote.findIndex(finalvotes => finalvotes.voteruser === $localStorage.userLogin) == -1){
        		for(var i = 0; i < $localStorage.countVotes.length; i++){
        			if($localStorage.finalCountVote.findIndex(finalvotes => finalvotes.candidate_id === $localStorage.countVotes[i].candidate_id &&
        			 finalvotes.position === $localStorage.countVotes[i].position) == -1){
        				finalvotes = {
		        			voteruser: $localStorage.countVotes[i].voter_id,
		        			candidate_id: $localStorage.countVotes[i].candidate_id,
		        			candidate_name: $localStorage.countVotes[i].name_candidate,
		        			position: $localStorage.countVotes[i].position,
		        			votes: 1
		        		}

		        		$localStorage.finalCountVote.push(finalvotes);

        			}else{
        				count = $localStorage.finalCountVote[i].votes;
        				count += 1; 
        				$localStorage.finalCountVote[i].votes = count;
        			}
        			console.log(count);
	        	}alert('are you sure you want to submit your vote?');
	        	$location.path('/voteview');
        	}else{
        		$location.path('/voteview');
        	}
        	
        	// $location.path('/voteview');
 
        }
}]);
