angular.module('meuApp')
    .controller('LoginController', function ($scope, $http, $state) {


        $scope.login = {
            email: '',
            password: ''
        }

        $scope.dadosDoUsuario = {
            name: '',
            email: ''
        }

        $scope.estaLogado = false;

        verificarMe = function (redirecionar) {
            $url = 'http://localhost:8000/api/usuarios/me';

            $token = localStorage.getItem('token');

            if ($token == null) {
                return;
            }

            $config = {
                headers: {
                    'Authorization': 'Bearer ' + $token
                }
            }

            $http.get($url, $config).then(function (response) {
                if (response.status == 200) {
                    console.log(response.data);
                    localStorage.setItem('usuario', JSON.stringify(response.data));
                    $scope.dadosDoUsuario = response.data;
                    if (redirecionar == true) {
                        $state.go('main.home')
                    }

                }
            }, function (error) {
                console.log(error);

            })
        }

        verificarMe(false);

        $scope.logar = function () {
            $url = 'http://localhost:8000/api/usuarios/login';

            $http.post($url, $scope.login).then(function (response) {
                if (response.status == 200) {
                    localStorage.setItem('token', response.data.token);
                    verificarMe(true);
                }

            }, function (error) {
                console.log(error);
            })
        }

        $scope.deslogar = function () {
            $url = 'http://localhost:8000/api/usuarios/logout';

            $config = {
                headers: {
                    'Authorization': 'Bearer ' + $token
                }
            }

            $http.get($url, $config).then(function (response) {
                if (response.status == 200) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('usuario');
                    $scope.estaLogado = false;
                    $scope.dadosDoUsuario = {
                        name: '',
                        email: ''
                    }
                }

            }, function (error) {
                console.log(error);
            })
        }
    });