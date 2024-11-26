angular.module('meuApp')
  .controller('GerenciarController', function ($scope, $http) {

    $scope.contatos = [];

    console.log($scope.contatos);

    listar = function () {
      $url = 'http://localhost:8000/api/Gerenciar/listar';
      $http.get($url).then(function (response) {
        console.log(response);
        $scope.contatos = response.data;

      }, function (error) {
        console.log(error);
      });

    }

    listar();

    $scope.status = 'criando';

    $scope.dados = {
      id: '',
      nome: '',
      email: '',
    };

    $scope.resetar = function () {
      $scope.status = 'criando';

      $scope.dados = {
        id: '',
        nome: '',
        email: '',
      };

      listar();
    }

    $scope.salvarInfo = function () {
      $url = 'http://localhost:8000/api/Gerenciar/salvar';
      $http.post($url, $scope.dados).then(function (response) {
        console.log(response);
        if (response.status == 201) {
          Swal.fire({
            title: 'Sucesso!',
            text: 'Operação realizada com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          $scope.resetar();
        }

      }, function (error) {
        console.log(error);
      });
    };

    $scope.editarSalvar = function () {
      $url = 'http://localhost:8000/api/Gerenciar/atualizarparcial/' + $scope.dados.id;
      $http.patch($url, $scope.dados).then(function (response) {
        console.log(response);
        if (response.status == 200) {
          Swal.fire({
            title: 'Sucesso!',
            text: 'Operação atualizada com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          $scope.resetar();
        }

      }, function (error) {
        console.log(error);
      });
    };

    $scope.delete = function (id) {


      Swal.fire({
        title: "Você tem certeza?",
        text: "Excluir este dado não é irreversível!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, delete isso!",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {

          $url = 'http://localhost:8000/api/Gerenciar/deletar/' + id;
          $http.delete($url).then(function (response) {
            if (response.status == 200) {
              Swal.fire({
                title: "Deletado!",
                text: "Seu dado foi deletado.",
                timer: 5000,
                timerProgressBar: true,
                icon: "success"
              });
              listar();
            }

          }, function (error) {
            console.log(error);
          });
        }
      });
    };

    $scope.editar = function (id) {
      $url = 'http://localhost:8000/api/Gerenciar/lerUm/' + id;
      $http.get($url).then(function (response) {
        $scope.status = 'editando';
        console.log(response);
        $scope.dados = response.data;

      }, function (error) {
        console.log(error);
      });
    };

});