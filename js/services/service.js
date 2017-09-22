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

<<<<<<< HEAD
app.factory('VoteService',[
=======
app.factory('VoteService', [
>>>>>>> 2c8f9be003ad9261acc4c4366a581c8ae02f5781
	'$http',
	'$q',
	function(
		$http,
<<<<<<< HEAD
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
=======
		$q){
		var baseUrl = 'https://devpartnerstraining.herokuapp.com/';
		var factory = this;

		factory.postVote = function(){
			var defer = $q.defer();

			$http({
				method: 'POST',
				url: baseUrl + 'VoteSet'
			}).then(function(response){
				return defer.resolve(resolve);
>>>>>>> 2c8f9be003ad9261acc4c4366a581c8ae02f5781
			}, function(error){
				return defer.reject(error);
			});
			return defer.promise;
		}
		return factory;
	}
<<<<<<< HEAD
=======

>>>>>>> 2c8f9be003ad9261acc4c4366a581c8ae02f5781
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
	this.user='';
	this.checkToken = function(){
		if($localStorage.userToken == true){
			$location.path('/votehome');

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
						// alert('ok');
						// console.log(sample1);
						CandidateService.postCandidate(sample1).then(function(response){
							if(response.data){
								alert("Posting data successful.");
							}
						});
						// $http.post('https://devpartnerstraining.herokuapp.com/CandidateSet',JSON.stringify(sample1)).then(function successCallback(response){
						// 	if(response.data){
						// 		alert("Posting data successful.");
						// 	}
						// }, function errorCallback(response){
						// 	alert(response.status);
						// });
						// alert('ok');
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

<<<<<<< HEAD
app.service("votingService",['$http','$location','$localStorage','candidateGetData','userLogin', function($http,$location,$localStorage, candidateGetData, userLogin){
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
=======
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
			// $localStorage.countVotes = [];


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


	    // this.submitvotes = function( press,internalvicepress,externalvicepress,secretary,asstSec,treasurer,asstTreas,auditor,pio,busManager){
	    // 	var vt = {
	    // 		voter_id: holder[index].id,
	    // 		candidate_id: {
	    // 		 press: press, 
	    // 		internalvicepress: internalvicepress, 
	    // 		externalvicepress: externalvicepress,
	    // 		secretary: secretary,
	    // 		asstSec: asstSec,
	    // 		treasurer: treasurer,
	    // 		asstTreas: asstTreas,
	    // 		auditor: auditor,
	    // 		pio: pio,
	    // 		busManager: busManager
	    // 		}
	  
	    		
	    // 	}

    	// // console.log($localStorage.votes);
    	// if (press != null || internalvicepress != null || externalvicepress != null || secretary != null || asstSec != null ||
    	// 	treasurer != null || asstTreas != null || auditor != null || pio != null || busManager != null){
    	// 	$localStorage.votes.push(vt);

    	// 	alert("successful");
    	// 	$location.path('/voteview');
    	// }else{
    	// 	alert("please vote");
    	// }
    	
     //    var holder={};
     //    var index = -1;
     //    var count = 1;
     //    this.hey = function(){
     //    let sam = {
     //        username: userLogin.user
     //    }
     //    $http.get('https://devpartnerstraining.herokuapp.com/VoterGet').then(function success(response){
     //        holder = response.data;
     //        index = holder.findIndex(sam => sam.username === userLogin.user);
     //        // console.log(holder[index].id);
     //    }, function failure(response){
     //    });
>>>>>>> 2c8f9be003ad9261acc4c4366a581c8ae02f5781
        
     //    }
     //    }


        this.submitvotes = function(){
        	// $localStorage.temCountVote = [];
        	// alert('ok');

        	// $localStorage.temCountVote = [];
        	
        	$location.path('/voteview');
      //       var vt = {
      //           voter_id: holder[index].id,
      //           candidate_id: [press,internalvicepress,externalvicepress,secretary,asstSec,treasurer,asstTreas,auditor,pio,busManager]
                
<<<<<<< HEAD
            }
            console.log(vt);
        console.log($localStorage.votes);
        if (press != null || internalvicepress != null || externalvicepress != null || secretary != null || asstSec != null ||
            treasurer != null || asstTreas != null || auditor != null || pio != null || busManager != null){
        	if(confirm("Are you sure you want to submit your votes ?"))
        	{
            	// $localStorage.votes.push(vt);
	            alert("successful");
	            $location.path('/voteview');
        	}
        }else{
            alert("please vote");
        }
=======
      //       }
      //   console.log($localStorage.votes);
      //   if (press != null || internalvicepress != null || externalvicepress != null || secretary != null || asstSec != null ||
      //       treasurer != null || asstTreas != null || auditor != null || pio != null || busManager != null){
      //   	if(confirm("Are you sure you want to submit your votes ?"))
      //   	{
      //       	$localStorage.votes.push(vt);
      // //       	console.log($localStorage.votes;)
      // //       	for(var i = 0; i<$localStorage.votes[0].candidate_id.length; i++){
    		// // 	console.log($localStorage.votes.voter_id+ " = "+$localStorage.votes.candidate_id[i]);
    		// // } 
	     //        alert("successful");
	     //        $location.path('/voteview');
      //   	}
      //   }else{
      //       alert("please vote");
      //   }
>>>>>>> 2c8f9be003ad9261acc4c4366a581c8ae02f5781
        
    }
}]);