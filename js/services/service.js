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

app.service("adminManagementFunction",[function(){

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

app.service("votingService",['$http','candidateGetData', function($http, candidateGetData){
	    this.sumbitvotes = function(press,internalvicepress,externalvicepress,secretary,asstSec,treasurer,asstTreas,auditor,pio,busManager){
	    	var vt = {
	    		press: press,
	    		internalvicepress: internalvicepress,
	    		externalvicepress: externalvicepress,
	    		secretary: secretary,
	    		asstSec: asstSec,
	    		asstTreas: asstTreas,
	    		auditor: auditor,
	    		pio: pio,
	    		busManager: busManager
	    	}
    	console.log(press);
    	console.log(internalvicepress);
    	console.log(externalvicepress);
    	console.log(secretary);
    	console.log(asstSec);
    	console.log(treasurer);
    	console.log(asstTreas);
    	console.log(auditor);
    	console.log(pio);
    	console.log(busManager);
    	
    	if (press != null || internalvicepress != null || externalvicepress != null || secretary != null || asstSec != null ||
    		treasurer != null || asstTreas != null || auditor != null || pio != null || busManager != null){
    		alert("successful");
    	}else{
    		alert("please vote");
    	}
    }

}]);