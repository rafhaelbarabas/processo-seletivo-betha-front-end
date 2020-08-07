angular.module("funcionarioCadastro").controller("listFuncionariosCtrl", ($scope, $http, funcionariosAPI) => {

  $scope.screenName = "Lista de funcionários"; // Apenas para testes no angular

  funcionariosAPI.getFuncionarios()
  .then((res) => {

    $scope.funcionarios = res.data.map((value) => {
      return { 
        ...value,
        cpf: screenFormat(value.cpf, "CPF"), 
        dataNascimento: screenFormat(value.dataNascimento, "DATA")
      }
    })      
  })
  .catch((err) => {
    $scope.funcionarios = []
    let exp = handleErrorMessage(err)
    alert(`Não foi possível carregar a lista de funcionários | Mensagem técnica ${exp}`)
  })

});