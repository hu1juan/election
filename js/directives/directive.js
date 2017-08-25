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