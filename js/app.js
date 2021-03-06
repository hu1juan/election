'use strict'

var app = angular.module('myApp', ['ngRoute','ngStorage','ui.bootstrap','ngMessages','ngMaterial']);

app.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl: 'html/login.html',
		controller: 'loginCtrl'
	})
	.when('/admin',{
		templateUrl: 'html/adminview.html',
		controller: 'adminCtrl as adminLis'
	})
	.when('/votehome',{
		templateUrl: 'html/voteHome.html',
		controller: 'voteHomeCtrl'
	})
	.when('/adminlogin',{
		templateUrl: 'html/adminlogin.html',
		controller: 'adminloginCtrl'
	})
	.when('/voteview', {
		templateUrl: 'html/voteView.html',
		controller: 'voteViewCtrl'
	})

});


