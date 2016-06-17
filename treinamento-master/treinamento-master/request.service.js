angular.module("listaTelefonica")

.service('requestService', requestServiceFn);

requestServiceFn.$inject = ['$http'];

function requestServiceFn($http) {


	function getOperadoras() {
		
	}

	return{
		getOperadoras;
	}

}