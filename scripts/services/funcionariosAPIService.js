angular.module("funcionarioCadastro").factory("funcionariosAPI", ($http) => {

  let baseURL = "http://127.0.0.1:8080/api/funcionarios";

  let _getFuncionarios = () => {
    return $http.get(baseURL);
  };

  let _getFuncionarioById = (id) => {
    return $http.get(`${baseURL}/${id}`)
  };

  let _postFuncionario = (funcionario) => {
    return $http.post(baseURL, funcionario)
  };

  return {
    getFuncionarios: _getFuncionarios,
    getFuncionarioById: _getFuncionarioById,
    postFuncionario: _postFuncionario
  }

});