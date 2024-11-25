angular.module('meuApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider){

    $stateProvider
    .state('main', {
        abstract: true,
        templateUrl: 'index.html',
    })
    .state('main.home', {
        url: '/',
        templateUrl: 'app/views/home.html',
        controller: 'testeController'
    })
    .state('login', {
        url: '/login',
        templateUrl: 'app/views/login.html',
        controller: 'LoginController'
    })

    $urlRouterProvider.otherwise('/');
});