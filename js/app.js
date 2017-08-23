'use strict'

var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl: 'html/login.html',
		controller: 'loginCtrl'
	})
	.when('/admin',{
		templateUrl: 'html/adminview.html',
		controller: 'adminCtrl'
	})
});