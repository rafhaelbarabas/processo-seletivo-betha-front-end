angular.module("funcionarioCadastro").controller("funcionariosCtrl", ($scope, $http, funcionariosAPI, enderecosAPI, telefonesAPI, controllerBridge) => {

  $scope.screenName = "Cadastro de funcionários"; // Apenas para testes no angular

  let baseUrlIBGE = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"

  function getUF() {
    $http.get(`${baseUrlIBGE}?orderBy=nome`).then((res) => $scope.estados = res.data);
  };

  getUF();

  $scope.getCities = (uf) => {
    if (uf) {
      $http.get(`${baseUrlIBGE}/${uf}/municipios?orderBy=nome`).then((res) => $scope.cidades = res.data);
    }
  }

  $scope.enderecos = [];
  $scope.telefones = [];

  $scope.novoEndereco = (endereco) => {

    // Reescreve o objeto para usar somente as propriedades sigla e nome para o ng-model e atualizar a prop para uf
    let novoEndereco = {
      logradouro: endereco.logradouro,
      cidade: endereco.cidade.nome,
      uf: endereco.estado.sigla,
      cep: endereco.cep
    }

    $scope.enderecos.push(novoEndereco);
    delete ($scope.endereco);
  }

  $scope.novoTelefone = (telefone) => {
    $scope.telefones.push(angular.copy(telefone));
    delete ($scope.telefone);
  }

  listarFuncionario = (id) => {
    funcionariosAPI.getFuncionarioById(id)
      .then((res) => {

        let funcionario = res.data

        // Preenche dados do funcionário no scope
        $scope.funcionario.nome = funcionario.nome
        $scope.funcionario.cpf = funcionario.cpf
        $scope.funcionario.dataNascimento = funcionario.dataNascimento

        // Busca endereços
        enderecosAPI.getEnderecoByIdFuncionario(id)
          .then((res) => {
            let enderecos = res.data
            enderecos.forEach((endereco) => {
              novoEndereco(endereco)
            })
          })

        // Busca telefones
        telefonesAPI.getTelefoneByIdFuncionario(id)
          .then((res) => {
            let telefones = res.data
            telefones.forEach((telefone) => {
              novoTelefone(telefone)
            });
          })
      })
      .catch((err) => {
        let exp = handleErrorMessage(err);
        alert(`Não foi possível carregar funcionário ID ${id} | Mensagem técnica: ${exp}`)
      })
  }

  console.log($scope)
  const idFuncionarioLista = controllerBridge.getItem()
  console.log(idFuncionarioLista)

  if (idFuncionarioLista) {
    listarFuncionario($scope.funcionario.id)
    controllerBridge.resetItem()
  }

  $scope.cadastrarFuncionario = (funcionario) => {

    let postFuncionario = {
      ...funcionario,
      cpf: prepareToPost(funcionario.cpf),
      dataNascimento: stringDateFormat(funcionario.dataNascimento)
    }

    funcionariosAPI.postFuncionario(postFuncionario)
      .then((res, status) => {

        const funcionarioId = res.data.id

        console.log(`FUNCIONARIO ID ${funcionarioId}`)

        if ($scope.enderecos.length) {

          let postEnderecos = $scope.enderecos.map((k) => {
            return {
              ...k,
              cep: prepareToPost(k.cep),
              idFuncionario: funcionarioId,
            }
          });

          console.log("Começando o for in de enderecos ")
          console.log(postEnderecos)

          postEnderecos.forEach((endereco) => {

            enderecosAPI.postEnderecos(endereco)
              .then(() => {
                console.log("Endereço(s) cadastrado(s) com sucesso...")
              })
              .catch((errE) => {
                let exp = handleErrorMessage(errE)
                alert(`Não foi possível cadastrar o endereço para o funcionario ${funcionario.nome}, mensagem técnica:${exp}`)
              });
          })
        }

        if ($scope.telefones.length) {

          let postTelefones = $scope.telefones.map((k) => {
            return {
              ...k,
              numero: prepareToPost(k.numero),
              idFuncionario: funcionarioId
            }
          });

          postTelefones.forEach((telefone) => {
            telefonesAPI.postTelefones(telefone)
              .then(() => {
                console.log("Telefone(s) cadastrado(s) com sucesso...")
              })
              .catch((errT) => {
                let exp = handleErrorMessage(errT)
                alert(`Não foi possível cadastrar o endereço para o funcionario ${funcionario.nome}, mensagem técnica:${exp}`)
              })
          })
        }

      })
      .catch((err) => {
        let exp = handleErrorMessage(err)
        alert(`${exp}`)
      })
  }
});