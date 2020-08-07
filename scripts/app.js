const app = angular.module("funcionarioCadastro", ['ui.mask', 'ui.router']);

app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {

  $urlRouterProvider.otherwise('/');

  $stateProvider  
    .state('lista', {
      url: '/lista',
      templateUrl: 'lista-funcionarios.html',
      controller: 'listFuncionariosCtrl'
    })
    .state('cadastro', {
      url: '/cadastro',
      templateUrl: 'novo-funcionario.html',
      controller: 'funcionariosCtrl'
    })

});