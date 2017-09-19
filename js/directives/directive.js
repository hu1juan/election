'use strict'

app.directive('validationForm', function(){
	return{
		link: function(scope, element, attrs){

			scope.onChange = function(){
				
				if(scope.fullname == null){
					scope.valid = true;
				}else{
					scope.valid = false;
				}
				// ngModel.$setViewValue(scope.fullname);
				// if(scope.fullname == "")
				// {
				// 	alert(scope.value);
				// 	scope.valid = false;
				// }
			}
        }
	};
});

app.directive('ngEnter',function(){
	return function (scope,element,attrs){
		element.bind("keydown keypress", function(event){
			if(event.which === 13){
				scope.$apply(function(){
					scope.$eval(attrs.ngEnter);
				});
				event.preventDefault();
			}
		});
	};
});