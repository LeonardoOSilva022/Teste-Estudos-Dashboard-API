angular.module('meuApp')
.controller('testeController', function($scope, $state) {
    // Lógica do controlador

$token = localStorage.getItem('token');
$scope.usuario = JSON.parse(localStorage.getItem('usuario'));

if ($token == null){
    $state.go('login')
}});