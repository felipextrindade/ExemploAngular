angular.module("listaTelefonica", ['ngMessages']);
		angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, $filter, $q, $http, $log, requestService) {
			var Ctrl = this;             
			Ctrl.app = "Lista Telefonica";
			Ctrl.teste = [{nome: 'felipe', telefone: '1140232622'},
						  {nome: 'hendrix', telefone: '1140232622'},
						  {nome: 'vinicius', telefone: '1140232622'}
						 ];

			Ctrl.contato = undefined;
			Ctrl.filtro = undefined;


		

			function getOperadoras() {
				var url = 'https://raw.githubusercontent.com/dhiegoatencio/treinamento/master/operadoras.json';
				return $http.get(url).then(function(response){
					return response.data;
				});
			}


			function getOperadoras2() {
				var url = 'https://raw.githubusercontent.com/dhiegoatencio/treinamento/master/operadoras.json';
				return $http.get(url).then(function(response){
					response.data.splice(0,1);
					return response.data;
				});
			}


			getOperadoras().then(function(operadoras){
				Ctrl.operadoras = operadoras;
			});

			$q.all([getOperadoras(), getOperadoras2()]).then(function(responses){
				var test = responses;

			});


			//exemplo da bomba

			function asyncBomba() {
				var tentativas = 0;
			    var deferred = $q.defer();
			    $log.info('Vai colocar a Bomba!');
			    setTimeout(function () {
			        while(Math.random() < 0.9) {
			        	deferred.notify('Armando...');
			        	tentativas++;
			        	if(tentativas > 3) {
			        		deferred.reject('Eita porra');
			        	}
			        }
			        deferred.resolve('Bomba Armada');
			    }, 3000);
			    return deferred.promise;
				}

			asyncBomba().then(function sucesso(data) {
				    $log.info(data);
				}, 
				function reject(rejectMessage){
					$log.info(rejectMessage);
				},
				function notifyFunc(notifyMessage){
					$log.info(notifyMessage);
				});



			Ctrl.AddContato = function(contato) {
				Ctrl.teste.push({nome: contato.nome, telefone: contato.telefone, operadora: contato.operadora});
				contato = undefined;
			}

			Ctrl.DeleteContato = function(contato, contatos) {
				var index = contatos.indexOf(contato);
				contatos.splice(index,1);
			}

			Ctrl.updateDisabled = function() {
				var Selecionados = $filter('filter')(contatos, {selecionar: true});
				if(Selecionados.length < 1) {
					Ctrl.mostrarApagar =  0;
				}
			}

			Ctrl.onClickSelecionado = function(contato) {
				if(contato.selecionar) {
					ctrl.mostrarApagar = false
				}
				else {
					updateDisabled();
				}
			}

			Ctrl.RemoverTudo = function(contatos) {
				var Selecionado = $filter('filter')(contatos, {selecionar: true});
				Selecionado.forEach(function(contato){
					var index = contatos.indexOf(contato);
					contatos.splice(index, 1);

				});
			}

			Ctrl.mostrarApagar = function(contatos) {
				var Selecionados = $filter('filter')(contatos, {selecionar: true});
				if(Selecionados.length < 1) {
					return 1;
				}
			}

		});